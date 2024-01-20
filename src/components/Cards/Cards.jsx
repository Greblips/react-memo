import { shuffle } from "lodash";
import { useEffect, useState, useRef } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { useSelector } from "react-redux";
import lifeLogo from "./images/life.svg";
import { getLeaders } from "../../utils/api";
import { getTimeInSeconds, sortLeadersByTime } from "../../utils/formatTime";
import SuperItemsView from "../SuperItems/SuperItemsView";
import SuperItemsAloha from "../SuperItems/SuperItemsAloha";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const { isActiveEasyMode } = useSelector(state => state.game);
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);
  //Попадаешь ли на лидерборд
  const [isOnLeaderboard, setIsOnLeaderboard] = useState(false);
  // Использовались ли суперспособности
  const [isSuperPowers, setisSuperPowers] = useState(false);
  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);
  const [previousCards, setPreviousCards] = useState(cards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //Достижения
  const achievements = isSuperPowers ? [1] : [1, 2];
  //Счетчик ошибок
  // Количество попыток
  const [tryes, setTryes] = useState(() => (isActiveEasyMode ? 3 : null));
  // Массив из колличества жизней,для отображения на игровом поле
  const lives = Array(tryes)
    .fill()
    .map((e, i) => i + 1);
  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  const intervalID = useRef(0);
  useEffect(() => {
    if (status === STATUS_WON && isOnLeaderboard) {
      fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
        method: "POST",
        body: JSON.stringify({
          name: localStorage.name,
          time:
            getTimerValue(gameStartDate, gameEndDate).minutes * 60 + getTimerValue(gameStartDate, gameEndDate).seconds,
          achievements,
        }),
      }).catch(error => {
        console.log(error.message);
      });
    }
  }, [gameEndDate, gameStartDate, isOnLeaderboard, status]);

  function viewCards() {
    setCards(
      cards.map(item => {
        item.open = true;
        return item;
      }),
    );
    const pauseTime = new Date();
    setGameEndDate(pauseTime);
    setisSuperPowers(true);
    setTimeout(() => {
      setGameStartDate(prevStartDate => {
        const timePaused = new Date().getTime() - pauseTime.getTime();
        const newStartDate = new Date(prevStartDate.getTime() + timePaused);
        setGameEndDate(null);
        return newStartDate;
      });
      setGameStartDate(new Date(gameStartDate.getTime() + 5000));
      setGameEndDate(null);
      setCards(
        cards.map(item => {
          item.open = false;
          return item;
        }),
      );
    }, 5000);
  }

  function aloha() {
    const closedCards = cards.filter(card => !card.open);
    const randomCard = closedCards[Math.floor(Math.random() * closedCards.length)];
    const newCards = cards.map(card =>
      card.rank === randomCard.rank && card.suit === randomCard.suit ? { ...card, open: true } : card,
    );

    setisSuperPowers(true);
    setCards(newCards);
    console.log(isSuperPowers);
    if (newCards.every(card => card.open)) {
      finishGame(STATUS_WON);
    }
  }

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
    setTryes(3);
  }
  function resetGame() {
    isActiveEasyMode && setTryes(3);
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setisSuperPowers(false);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = async clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }

    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    const prevCards = [...cards];

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      const leaders = await getLeaders();
      const sortedLeaders = sortLeadersByTime(leaders.leaders);
      const leadersLength = sortedLeaders.length;
      const isLeadResult = sortedLeaders[leadersLength - 1].time > getTimeInSeconds(timer) && pairsCount === 9;
      setIsOnLeaderboard(isLeadResult);
      finishGame(STATUS_WON);

      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    const playerLost = openCardsWithoutPair.length >= 2;
    // "Игрок проиграл", т.к на поле есть две открытые карты без пары
    if (isActiveEasyMode && playerLost) {
      setTryes(() => tryes - 1);
      setCards(nextCards);
      console.log(isSuperPowers);
      console.log(achievements);
      setTimeout(() => {
        if (tryes <= 1) finishGame(STATUS_LOST);
        setCards(previousCards);
      }, 500);
      return;
    }

    if (tryes < 1) finishGame(STATUS_LOST);

    if (playerLost) {
      finishGame(STATUS_LOST);

      return;
    }
    setPreviousCards(prevCards);
    // ... игра продолжается
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    intervalID.current = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 250);
    return () => {
      clearInterval(intervalID.current);
    };
  }, [gameStartDate, gameEndDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              <div>:</div>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS && (
          <div className={styles.superItemContainer}>
            <SuperItemsView viewCards={viewCards} onClick={viewCards} />
            <SuperItemsAloha aloha={aloha} onClick={aloha} />
          </div>
        )}
        {status === STATUS_IN_PROGRESS && isActiveEasyMode === true ? (
          <div className={styles.liveBox}>
            {lives && lives.map(index => <img key={index} className={styles.liveBlock} src={lifeLogo} alt="hp" />)}
          </div>
        ) : (
          ""
        )}
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            name={localStorage.name}
            isOnLeaderboard={isOnLeaderboard}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
    </div>
  );
}

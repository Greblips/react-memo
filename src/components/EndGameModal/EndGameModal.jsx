import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { LeaderBoardLink } from "../LeaderBoardLink/LeaderBoardLink";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, isOnLeaderboard, name }) {
  const title = isOnLeaderboard ? "Вы попали на Лидерборд" : isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.nameModal}>{name}</div>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      <div className={styles.footer}>
        <Button onClick={onClick}>Начать сначала</Button>
        <LeaderBoardLink>к лидерборду</LeaderBoardLink>
      </div>
    </div>
  );
}

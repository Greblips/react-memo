import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { gameModeReducer } from "../../store/slices/game";
import { LeaderBoardLink } from "../../components/LeaderBoardLink/LeaderBoardLink";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  const dispatch = useDispatch();
  const { isActiveEasyMode } = useSelector(state => state.game);
  const [lsName, setLsName] = useState(localStorage.name);
  const [name, setName] = useState();

  function addName() {
    if (name !== "" && name !== undefined) {
      localStorage.name = name;
      setLsName(name);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {lsName ? (
          <>
            <h1 className={styles.title}>Выбери сложность</h1>
            <div className={styles.nameBlock}>
              <div className={styles.name}> Здравствуйте :{name}!</div>
              <Link
                href="/#"
                className={styles.changeName}
                onClick={() => {
                  localStorage.name = "";
                  setName(null);
                  setLsName(null);
                }}
              >
                Сменить имя
              </Link>
            </div>

            <ul className={styles.levels}>
              <li className={styles.level}>
                <Link className={styles.levelLink} to="/game/3">
                  1
                </Link>
              </li>
              <li className={styles.level}>
                <Link className={styles.levelLink} to="/game/6">
                  2
                </Link>
              </li>
              <li className={styles.level}>
                <Link className={styles.levelLink} to="/game/9">
                  3
                </Link>
              </li>
            </ul>
            <div className={styles.toggleCheckBox}>
              <input
                type="checkbox"
                id="toggleCheckBox"
                name="check"
                onChange={() => {
                  dispatch(gameModeReducer());
                }}
              />
              <label htmlFor="toggleCheckBox"></label>
            </div>
            {isActiveEasyMode ? (
              <p className={styles.mode}>Легкий режим (3 жизни)</p>
            ) : (
              <p className={styles.noMode}>Стандартная игра</p>
            )}
            <LeaderBoardLink>Таблица лидеров</LeaderBoardLink>
          </>
        ) : (
          <>
            <div className={styles.inputNameBlock}>
              <h1 className={styles.title}>Введите имя</h1>
              <input
                type="text"
                className={styles.input}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              <Button onClick={addName}>Запомнить меня</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

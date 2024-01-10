import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { gameModeReducer } from "../../store/slices/game";

// import { useDispatch, useSelector } from "react-redux";
// import { setIsActiveGameModeNative } from "../../store/slices/game";
// import { setIsActiveGameMode } from "../../store/slices/gameMod";

export function SelectLevelPage() {
  const dispatch = useDispatch();
  const { gameRegime } = useSelector(state => state.game);
  // const dispatch = useDispatch();
  // const nativegame = useSelector(state => state.game.isActiveGameMode);

  // function chengeCheckbox() {
  //   dispatch(setIsActiveGameMode());
  //   dispatch(setIsActiveGameModeNative());
  // }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
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
            id="pill4"
            name="check"
            onChange={() => {
              dispatch(gameModeReducer());
            }}
          />
          <label htmlFor="pill4"></label>
        </div>

        {gameRegime ? (
          <p className={styles.mode}>Легкий режим (3 жизни)</p>
        ) : (
          <p className={styles.noMode}>Стандартная игра</p>
        )}
      </div>
    </div>
  );
}

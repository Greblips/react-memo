/* eslint-disable prettier/prettier */
import styles from "./LeaderBoardEl.module.css";

export function LeaderboardEl({ position, user, time, color = "black" }) {
    return (
        <li style={{ color: color }} className={styles.item}>
            <span className={styles.position}>{position}</span>
            <span className={styles.user}>{user}</span>
            <span className={styles.time}>{time}</span>
        </li>
    );
}

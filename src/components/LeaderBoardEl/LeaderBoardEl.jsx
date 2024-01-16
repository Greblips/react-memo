/* eslint-disable prettier/prettier */
import { useState } from "react";
import styles from "./LeaderBoardEl.module.css";
import hardImg from "../LeaderBoardEl/images/hard.svg";
import magicImg from "../LeaderBoardEl/images/magic.svg";
import noHardImg from "../LeaderBoardEl/images/no-hard.svg"
import noMagicImg from "../LeaderBoardEl/images/no-magic.svg"


export function LeaderboardEl({ position, user, achievements, time, setContextMenu, contextMenu, color = "black" }) {
    // const [left, setLeft] = useState(null);
    // const [text, setText] = useState(null);
    const [hard] = useState(achievements?.includes(1));
    // function mouseEnter(leftIndent) {
    //     setLeft(leftIndent);
    //     setContextMenu(position);
    // }

    // function mouseLeave() {
    //     setContextMenu(null);
    // }
    console.log(hard)
    const [magic] = useState(achievements?.includes(2));
    return (
        <li style={{ color: color }} className={styles.item}>
            <span className={styles.position}>{position}</span>
            <span className={styles.user}>{user}</span>
            <span className={styles.achievements}>
                {/* {contextMenu === position && <div className={styles.popup} style={{ left: `${left}px` }}>{text}</div>} */}
                {hard ? <img
                    src={hardImg}
                    alt="hard achievements"

                />
                    :
                    <img
                        src={noHardImg}
                        alt="hard achievements"

                    />
                }
                {magic ? <img
                    src={magicImg}
                    alt="magic achievements"

                />
                    :
                    <img
                        src={noMagicImg}
                        alt="magic achievements"

                    />}</span>
            <span className={styles.time}>{time}</span>
        </li>
    );
}

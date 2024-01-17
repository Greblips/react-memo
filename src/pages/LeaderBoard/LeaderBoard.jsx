// import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css";
import { LeaderboardEl } from "../../components/LeaderBoardEl/LeaderBoardEl";
import { Link } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import { getLeaders } from "../../utils/api";
import { sortLeadersByTime } from "../../utils/formatTime";

export const LeaderBoard = () => {
  const [leaderList, setLeaderList] = useState(null);
  const [error, setError] = useState(null);
  const [contextMenu, setContextMenu] = useState(false);

  useEffect(() => {
    getLeaders()
      .then(leaders => {
        const sortedLeaders = sortLeadersByTime(leaders.leaders);
        setLeaderList(sortedLeaders);
        console.log(sortedLeaders);
      })
      .catch(error => setError(error.message));
  }, []);

  const leadersElements = leaderList?.map((liderItem, index) => (
    <LeaderboardEl
      key={liderItem.id}
      position={`#${index + 1}`}
      user={liderItem.name}
      achievements={liderItem.achievements}
      time={formatTime(liderItem.time)}
      contextMenu={contextMenu}
      setContextMenu={setContextMenu}
    />
  ));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.topHeading}>Лидерборд</h1>
        <Link className={styles.link} to="/">
          Начать игру
        </Link>
      </div>
      <div className={styles.headers}>
        <div className={styles.headersitem}>Позиция</div>
        <div className={styles.headersitem}>Пользователь</div>
        <div className={styles.headersitem}>Достижения</div>
        <div className={styles.headersitem}>Время</div>
      </div>
      <ul className={styles.table}>{leadersElements}</ul>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

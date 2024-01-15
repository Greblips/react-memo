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

  useEffect(() => {
    getLeaders()
      .then(leaders => {
        const sortedLeaders = sortLeadersByTime(leaders.leaders);
        setLeaderList(sortedLeaders);
      })
      .catch(error => setError(error.message));
  }, []);

  const leadersElements = leaderList?.map((liderItem, index) => (
    <LeaderboardEl
      key={liderItem.id}
      position={`#${index + 1}`}
      user={liderItem.name}
      time={formatTime(liderItem.time)}
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
      <ul className={styles.table}>
        <LeaderboardEl position={"Позиция"} user={"Пользователь"} time={"Время"} color={"#999999"} />
        {leadersElements}
      </ul>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

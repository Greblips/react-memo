import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderboardEl } from "../../components/LeaderBoardEl/LeaderBoardEl";
import { Link } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";

export const LeaderBoard = () => {
  const [leaderList, setLeaderList] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://wedev-api.sky.pro/api/v2/leaderboard/?limit = 12");
        const leaderListData = response.data.leaders;
        const data = leaderListData?.sort((a, b) => (a.time > b.time ? 1 : -1));
        setLeaderList(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
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
        <Button>
          <Link className={styles.link} to="/">
            Начать игру
          </Link>
        </Button>
      </div>
      <ul className={styles.table}>
        <LeaderboardEl position={"Позиция"} user={"Пользователь"} time={"Время"} color={"#999999"} />
        {leadersElements}
      </ul>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

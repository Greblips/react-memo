import React from "react";
import { Link } from "react-router-dom";
import styles from "./LeaderBoardLink.module.css";
export function LeaderBoardLink({ children }) {
  return (
    <Link className={styles.link} to="/leaderboard">
      {children}
    </Link>
  );
}

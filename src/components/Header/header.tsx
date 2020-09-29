import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <div className={styles.upperTitle}>{`{ ... }`}</div>
        <div className={styles.lowerTitle}>JSON Path Visualizer</div>
      </div>
      <a
        target="_blank"
        className={styles.gitRepoLink}
        href="https://github.com/romitgithub/11sigma-frontend-test"
      >
        Github Repo
      </a>
    </header>
  );
}

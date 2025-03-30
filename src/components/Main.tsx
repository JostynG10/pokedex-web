import React from "react";
import ResultsList from "./ResultsList";
import styles from "@/styles/Main.module.css";

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.mainForm}>
        <div className={styles.mainLeftForm} />
        <div className={styles.mainMiddleForm} />
        <div className={styles.mainRightForm} />
      </div>

      <ResultsList />
    </main>
  );
};

export default Main;

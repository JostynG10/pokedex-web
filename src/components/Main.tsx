import React from "react";
import ResultsList from "./ResultsList";
import styles from "@/styles/Main.module.css";
import SearchBar from "./SearchBar";

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.mainForm}>
        <span className={styles.mainLeftForm} />
        <span className={styles.mainMiddleForm} />
        <span className={styles.mainRightForm} />
      </section>

      <SearchBar />
      <ResultsList />
    </main>
  );
};

export default Main;

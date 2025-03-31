import React, { Suspense } from "react";
import Result from "./Result";
import styles from "@/styles/Main.module.css";
import SearchBar from "./SearchBar";
import SearchBarLoading from "./SearchBarLoading";
import Content from "./Content";
import ResultLoading from "./ResultLoading";

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.mainForm}>
        <span className={styles.mainLeftForm} />
        <span className={styles.mainMiddleForm} />
        <span className={styles.mainRightForm} />
      </section>

      <div className={styles.searchContainer}>
        <Suspense fallback={<SearchBarLoading />}>
          <SearchBar />
        </Suspense>
      </div>

      <Content>
        <Suspense fallback={<ResultLoading />}>
          <Result />
        </Suspense>
      </Content>
    </main>
  );
};

export default Main;

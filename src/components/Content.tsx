import React from "react";
import Pagination from "./Pagination";
import ContentProps from "@/types/ContentProps";
import styles from "@/styles/Content.module.css";

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <section className={styles.resultSection}>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <span className={styles.listTop}></span>
          {children}
          <span className={styles.listBottom}></span>
        </div>
      </div>

      <Pagination />
    </section>
  );
};

export default Content;

import React from "react";
import styles from "@/styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerForm}>
        <div className={styles.leftHeaderForm} />
        <div className={styles.middleHeaderForm} />
        <div className={styles.rightHeaderForm} />
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import styles from "@/styles/Header.module.css";
import HomeButton from "./HomeButton";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.headerForm}>
        <div className={styles.leftHeaderForm} />
        <div className={styles.middleHeaderForm} />
        <div className={styles.rightHeaderForm} />
      </nav>

      <section className={styles.content}>
        <HomeButton />

        <div className={styles.textAndPoints}>
          <ul className={styles.pointsBox}>
            <li className={`${styles.point} ${styles.pointRed}`} />
            <li className={`${styles.point} ${styles.pointYellow}`} />
            <li className={`${styles.point} ${styles.pointGreen}`} />
          </ul>

          <h1 className={styles.title}>Pokédex</h1>
        </div>
      </section>
    </header>
  );
};

export default Header;

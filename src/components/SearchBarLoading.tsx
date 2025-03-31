import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/SearchBarLoading.module.css";

const SearchBarLoading: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.inputBox}>
        <p className={styles.inputText}>Loading...</p>
      </div>
      <div className={styles.searchIconBox}>
        <FaSearch className={styles.searchIcon} />
      </div>
    </section>
  );
};

export default SearchBarLoading;

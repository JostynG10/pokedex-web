"use client";

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "@/styles/LoadingError.module.css";
import LoadingErrorProps from "@/types/LoadingErrorProps";

const LoadingError: React.FC<LoadingErrorProps> = ({ isSearch, reload }) => {
  return (
    <section className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorScreen}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <h2 className={styles.errorMessage}>
            {isSearch
              ? "No results were found."
              : "An error occurred while loading the data. Please try again."}
          </h2>
        </div>

        {!isSearch && (
          <button className={styles.errorButton} onClick={reload}>
            Try again
          </button>
        )}
      </div>
    </section>
  );
};

export default LoadingError;

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
              ? "No se encontró ningún resultado."
              : "Ocurrió un error al cargar los datos. Por favor, intenta de nuevo."}
          </h2>
        </div>

        {!isSearch && (
          <button className={styles.errorButton} onClick={reload}>
            Intentar de nuevo
          </button>
        )}
      </div>
    </section>
  );
};

export default LoadingError;

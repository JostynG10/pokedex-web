import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "@/styles/ResultLoading.module.css";

const ResultLoading: React.FC = () => {
  return (
    <section className={styles.resultLoading}>
      <div className={styles.content}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <h2 className={styles.errorMessage}>
          Cargando datos de Pokémon, por favor espera un momento...
        </h2>
      </div>
    </section>
  );
};

export default ResultLoading;

"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  setCurrentOffset,
  setCurrentLimit,
} from "@/store/slices/paginationSlice";
import styles from "@/styles/Pagination.module.css";

const limits = [10, 20, 30];

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const prevOffset = useSelector(
    (state: RootState) => state.pagination.prevOffset
  );
  const nextOffset = useSelector(
    (state: RootState) => state.pagination.nextOffset
  );
  const currentLimit = useSelector(
    (state: RootState) => state.pagination.currentLimit
  );

  const clickPrevButton = () => {
    if (prevOffset !== null) {
      dispatch(setCurrentOffset(prevOffset));
    }
  };

  const clickNextButton = () => {
    if (nextOffset !== null) {
      dispatch(setCurrentOffset(nextOffset));
    }
  };

  const clickLimitButton = () => {
    const limitPosition = limits.indexOf(currentLimit);
    const nextLimit = limits[(limitPosition + 1) % limits.length];
    dispatch(setCurrentLimit(nextLimit));
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={clickPrevButton}
        className={styles.paginationButton}
        disabled={prevOffset === null}
      >
        Anterior
      </button>

      <button
        onClick={clickLimitButton}
        type="button"
        className={`${styles.paginationButton} ${styles.paginationToggle}`}
        disabled={nextOffset === null && prevOffset === null}
      >
        {currentLimit}
      </button>

      <button
        onClick={clickNextButton}
        className={styles.paginationButton}
        disabled={nextOffset === null}
      >
        Proximo
      </button>
    </div>
  );
};

export default Pagination;

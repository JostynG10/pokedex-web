"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setCurrentOffset } from "@/store/slices/offsetsSlice";
import styles from "@/styles/Pagination.module.css";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const prevOffset = useSelector((state: RootState) => state.offset.prevOffset);
  const nextOffset = useSelector((state: RootState) => state.offset.nextOffset);

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

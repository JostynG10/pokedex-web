"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentOffset } from "@/store/slices/paginationSlice";
import styles from "@/styles/HomeButton.module.css";

const HomeButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
    dispatch(setCurrentOffset(0));
  };

  return (
    <button type="button" onClick={handleClick} className={styles.borderSphere}>
      <span className={styles.sphere} />
    </button>
  );
};

export default HomeButton;

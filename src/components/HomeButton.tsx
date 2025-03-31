"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/HomeButton.module.css";

const HomeButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div onClick={handleClick} className={styles.borderSphere}>
      <span className={styles.sphere} />
    </div>
  );
};

export default HomeButton;

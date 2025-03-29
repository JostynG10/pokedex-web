import React, { useEffect } from "react";
import Image from "next/image";
import CardProps from "@/types/CardProps";
import styles from "@/styles/Card.module.css";

const Card: React.FC<CardProps> = ({ name, url }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setImageUrl(data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching Pokemon image:", error);
      }
    };

    fetchImage();
  }, [url]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl || ""}
          alt={name}
          width={150}
          height={150}
          className={styles.image}
        />
      </div>
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

export default Card;

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
      <div className={styles.pointsBox}>
        <div className={styles.point} />
        <div className={styles.point} />
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/images/card-background.jpg"
          alt="Fondo"
          width={150}
          height={150}
          className={styles.imageBackground}
        />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            className={styles.pokemonImage}
          />
        )}
      </div>

      <h2 className={styles.name}>
        {!imageUrl
          ? "Cargando..."
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </div>
  );
};

export default Card;

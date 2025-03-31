import React, { useCallback, useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Image from "next/image";
import CardProps from "@/types/CardProps";
import styles from "@/styles/Card.module.css";

const Card: React.FC<CardProps> = ({ number, name, url }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const fetchImage = useCallback(async (url: string) => {
    try {
      setLoading(true);
      setHasError(false);

      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();

      setImageUrl(data.sprites.front_default);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon image:", error);
    }
  }, []);

  useEffect(() => {
    if (url) fetchImage(url);
  }, [url, fetchImage]);

  const handleRetry = () => {
    fetchImage(url);
  };

  return (
    <article className={styles.card}>
      <ul className={styles.pointsBox}>
        <li className={styles.point} />
        <li className={styles.point} />
      </ul>

      <section className={styles.imageContainer}>
        {loading ? (
          <div className={styles.loadingScreen}>
            <h3 className={styles.screenMessage}>Cargando imagen...</h3>
          </div>
        ) : hasError ? (
          <div className={styles.loadingScreen}>
            <FaExclamationTriangle className={styles.errorIcon} />
            <h3 className={styles.screenMessage}>Error al cargar la imagen</h3>
            <button
              onClick={handleRetry}
              type="button"
              className={styles.screenButton}
            >
              Reintentar
            </button>
          </div>
        ) : (
          imageUrl && (
            <>
              <Image
                src="/images/card-background.jpg"
                alt="Fondo"
                width={220}
                height={150}
                priority
              />
              <Image
                src={imageUrl}
                alt={name}
                width={150}
                height={150}
                className={styles.pokemonImage}
              />
            </>
          )
        )}
      </section>

      <h2 className={styles.name}>
        <span className={styles.number}>{number}. </span>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>
    </article>
  );
};

export default Card;

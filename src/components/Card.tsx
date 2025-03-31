import React, { useCallback, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { getPokemonImage, getPokemonInfo } from "@/services/pokeApi";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import CardProps from "@/types/CardProps";
import styles from "@/styles/Card.module.css";
import PokemonInfo from "@/types/PokemonInfo";

const Card: React.FC<CardProps> = ({ number, name, url }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const { showModal } = useModal();

  const fetchImage = useCallback(async (url: string) => {
    try {
      setLoading(true);
      setHasError(false);

      const data = await getPokemonImage(url);
      setImageUrl(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon image:", error);
    }
  }, []);

  const fetchPokemonInfo = useCallback(
    async (name: string) => {
      try {
        const data: PokemonInfo = await getPokemonInfo(name);
        showModal({
          url,
          name,
          number,
          abilities: data.abilities,
          types: data.types,
          weight: data.weight,
        });
      } catch (error) {
        console.error("Error fetching Pokemon info:", error);
      }
    },
    [number, url, showModal]
  );

  useEffect(() => {
    if (url) fetchImage(url);
  }, [url, fetchImage]);

  const handleRetry = () => {
    fetchImage(url);
  };

  const handleDoubleClick = () => {
    fetchPokemonInfo(name);
  };

  const handleDoubleTouch = () => {
    let lastTouch = 0;
    return () => {
      const now = Date.now();
      const timeSinceLastTouch = now - lastTouch;
      if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
        fetchPokemonInfo(name);
      }
      lastTouch = now;
    };
  };

  return (
    <article
      className={styles.card}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleDoubleTouch()}
    >
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

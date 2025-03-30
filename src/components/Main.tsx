"use client";

import React, { useEffect } from "react";
import styles from "@/styles/Main.module.css";
import Card from "./Card";
import { getPokemonList } from "@/services/pokeApi";
import PokemonListResponse from "@/types/PokemonListResponse";
import PokemonListItem from "@/types/PokemonListItem";
import { FaExclamationTriangle } from "react-icons/fa";

const Main: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pokemonList, setPokemonList] = React.useState<
    PokemonListItem[] | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  const [prevOffset, setPrevOffset] = React.useState<number | null>(null);
  const [nextOffset, setNextOffset] = React.useState<number | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setHasError(false);

      // Scroll to the top of the list
      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      const data: PokemonListResponse = await getPokemonList(offset, 10);
      setPokemonList(data.results);
      if (data.previous) {
        const prevUrlParams = new URL(data.previous).searchParams;
        setPrevOffset(parseInt(prevUrlParams.get("offset") || "0", 10));
      } else {
        setPrevOffset(null);
      }
      if (data.next) {
        const nextUrlParams = new URL(data.next).searchParams;
        setNextOffset(parseInt(nextUrlParams.get("offset") || "0", 10));
      } else {
        setNextOffset(null);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon list:", error);
    }
  }, [offset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clickPrevButton = () => {
    if (prevOffset !== null) {
      setOffset(prevOffset);
    }
  };

  const clickNextButton = () => {
    if (nextOffset !== null) {
      setOffset(nextOffset);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainForm}>
        <div className={styles.mainLeftForm} />
        <div className={styles.mainMiddleForm} />
        <div className={styles.mainRightForm} />
      </div>

      {!hasError ? (
        <section className={styles.resultSection}>
          <div ref={listRef} className={styles.list}>
            {loading
              ? [...Array(10)].map((_, index) => (
                  <Card key={index} name="Cargando..." url="" />
                ))
              : pokemonList?.map((pokemon) => {
                  const pokemonNumber = parseInt(
                    pokemon.url.split("/").filter(Boolean).pop() || "0",
                    10
                  );
                  return (
                    <Card
                      key={pokemon.name}
                      number={pokemonNumber}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
                  );
                })}
          </div>

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
        </section>
      ) : (
        <section className={styles.error}>
          <div className={styles.errorContainer}>
            <div className={styles.errorScreen}>
              <FaExclamationTriangle className={styles.errorIcon} />
              <h2 className={styles.errorMessage}>
                Ocurrió un error al cargar los datos. Por favor, intenta de
                nuevo.
              </h2>
            </div>

            <button className={styles.errorButton} onClick={fetchData}>
              Intentar de nuevo
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default Main;

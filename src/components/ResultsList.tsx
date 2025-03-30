"use client";

import React, { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { getPokemonByName, getPokemonList } from "@/services/pokeApi";
import { useSearchParams } from "next/navigation";
import PokemonListResponse from "@/types/PokemonListResponse";
import PokemonListItem from "@/types/PokemonListItem";
import Card from "./Card";
import styles from "@/styles/ResultsList.module.css";

const ResultsList: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pokemonList, setPokemonList] = React.useState<
    PokemonListItem[] | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  const [prevOffset, setPrevOffset] = React.useState<number | null>(null);
  const [nextOffset, setNextOffset] = React.useState<number | null>(null);
  const searchParams = useSearchParams();

  const fetchDataList = React.useCallback(async () => {
    try {
      setLoading(true);
      setHasError(false);

      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      const data: PokemonListResponse = await getPokemonList(offset, 10);
      setPokemonList(data.results);
      setPrevOffset(
        data.previous
          ? parseInt(
              new URL(data.previous).searchParams.get("offset") || "0",
              10
            )
          : null
      );
      setNextOffset(
        data.next
          ? parseInt(new URL(data.next).searchParams.get("offset") || "0", 10)
          : null
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon list:", error);
    }
  }, [offset]);

  const fetchDataByName = React.useCallback(async (searchValue: string) => {
    try {
      setLoading(true);
      setHasError(false);

      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      const data: PokemonListItem = await getPokemonByName(searchValue);
      setPokemonList([data]);
      setPrevOffset(null);
      setNextOffset(null);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon by name:", error);
    }
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      fetchDataByName(searchQuery);
    } else {
      fetchDataList();
    }
  }, [searchParams, fetchDataByName, fetchDataList]);

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
    <>
      {!hasError ? (
        <section className={styles.resultSection}>
          <div className={styles.listContainer}>
            <div className={styles.list}>
              <span className={styles.listTop}></span>
              <div ref={listRef} className={styles.pokemonList}>
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
              <span className={styles.listBottom}></span>
            </div>
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

            <button className={styles.errorButton} onClick={fetchDataList}>
              Intentar de nuevo
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default ResultsList;

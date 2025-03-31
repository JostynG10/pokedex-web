"use client";

import React, { useEffect } from "react";
import { getPokemonByName, getPokemonList } from "@/services/pokeApi";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setPrevOffset, setNextOffset } from "@/store/slices/offsetsSlice";
import { FaExclamationTriangle } from "react-icons/fa";
import PokemonListResponse from "@/types/PokemonListResponse";
import PokemonListItem from "@/types/PokemonListItem";
import Card from "./Card";
import styles from "@/styles/Result.module.css";
import LoadingError from "./LoadingError";

const Result: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pokemonList, setPokemonList] = React.useState<
    PokemonListItem[] | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const currentOffset = useSelector(
    (state: RootState) => state.offset.currentOffset
  );

  const fetchDataList = React.useCallback(async () => {
    try {
      setLoading(true);
      setHasError(false);

      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      const data: PokemonListResponse = await getPokemonList(currentOffset, 10);
      setPokemonList(data.results);
      dispatch(
        setPrevOffset(
          data.previous
            ? parseInt(
                new URL(data.previous).searchParams.get("offset") || "0",
                10
              )
            : null
        )
      );
      dispatch(
        setNextOffset(
          data.next
            ? parseInt(new URL(data.next).searchParams.get("offset") || "0", 10)
            : null
        )
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      console.error("Error fetching Pokemon list:", error);
    }
  }, [currentOffset, dispatch]);

  const fetchDataByName = React.useCallback(
    async (searchValue: string) => {
      try {
        setLoading(true);
        setHasError(false);

        if (listRef.current) {
          listRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }

        const data: PokemonListItem = await getPokemonByName(searchValue);
        setPokemonList([data]);
        dispatch(setPrevOffset(null));
        dispatch(setNextOffset(null));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHasError(true);
        console.error("Error fetching Pokemon by name:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      fetchDataByName(searchQuery);
    } else {
      fetchDataList();
    }
  }, [searchParams, fetchDataByName, fetchDataList]);

  const reload = () => {
    if (searchParams.get("search")) {
      fetchDataByName(searchParams.get("search") || "");
    } else {
      fetchDataList();
    }
  };

  return (
    <>
      {!hasError ? (
        <div
          ref={listRef}
          className={`${styles.result} ${loading ? styles.resultLoading : ""}`}
        >
          {loading ? (
            <div className={styles.loadingResult}>
              <FaExclamationTriangle className={styles.loadingIcon} />
              <h2 className={styles.loadingMessage}>
                Cargando datos de Pokémon, por favor espera un momento...
              </h2>
            </div>
          ) : (
            pokemonList?.map((pokemon) => {
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
            })
          )}
        </div>
      ) : (
        <LoadingError reload={reload} />
      )}
    </>
  );
};

export default Result;

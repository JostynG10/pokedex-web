"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getPokemonByName, getPokemonList } from "@/services/pokeApi";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setPrevOffset, setNextOffset } from "@/store/slices/paginationSlice";
import { FaExclamationTriangle } from "react-icons/fa";
import PokemonListResponse from "@/types/PokemonListResponse";
import PokemonListItem from "@/types/PokemonListItem";
import Card from "./Card";
import styles from "@/styles/Result.module.css";
import LoadingError from "./LoadingError";

const Result: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListItem[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const currentOffset = useSelector(
    (state: RootState) => state.pagination.currentOffset
  );
  const currentLimit = useSelector(
    (state: RootState) => state.pagination.currentLimit
  );

  const fetchDataList = React.useCallback(async () => {
    try {
      setLoading(true);
      setHasError(false);

      if (listRef.current) {
        listRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      const data: PokemonListResponse = await getPokemonList(
        currentOffset,
        currentLimit
      );
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
  }, [currentOffset, currentLimit, dispatch]);

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

  const memorizeList = useMemo(() => {
    return pokemonList?.map((pokemon) => {
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
    });
  }, [pokemonList]);

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
            memorizeList
          )}
        </div>
      ) : (
        <LoadingError isSearch={!!searchParams.get("search")} reload={reload} />
      )}
    </>
  );
};

export default Result;

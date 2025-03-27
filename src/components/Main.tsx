"use client";

import React, { useEffect } from "react";
import styles from "@/styles/Main.module.css";
import Card from "./Card";
import { getPokemonList } from "@/services/pokeApi";
import PokemonListResponse from "@/types/PokemonListResponse";
import PokemonListItem from "@/types/PokemonListItem";

const Main: React.FC = () => {
  const [pokemonList, setPokemonList] = React.useState<
    PokemonListItem[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PokemonListResponse = await getPokemonList(0, 10);
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.mainForm}>
        <div className={styles.mainTopForm} />
      </div>

      <section className={styles.resultSection}>
        {pokemonList && pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))
        ) : (
          <div className={styles.noResults}>No results found</div>
        )}
      </section>
    </main>
  );
};

export default Main;

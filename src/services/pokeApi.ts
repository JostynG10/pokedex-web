"use server";

import PokemonListItem from "@/types/PokemonListItem";
import PokemonListResponse from "@/types/PokemonListResponse";

export async function getPokemonList(
  offset: number,
  limit: number = 10
): Promise<PokemonListResponse> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getPokemonByName(name: string): Promise<PokemonListItem> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return {
    name: data.name,
    url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
  };
}

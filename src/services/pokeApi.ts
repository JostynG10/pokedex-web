"use server";

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

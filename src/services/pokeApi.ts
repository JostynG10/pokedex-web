"use server";

import AbilityEffect from "@/types/AbilityEffect";
import PokemonInfo from "@/types/PokemonInfo";
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

export async function getPokemonInfo(name: string): Promise<PokemonInfo> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return {
    abilities: data.abilities,
    types: data.types,
    weight: data.weight,
  };
}

export async function getAbilityEffect(url: string): Promise<AbilityEffect> {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const effectEntry = data.effect_entries.find(
    (entry: { language: { name: string } }) => entry.language.name === "en"
  );
  return {
    effect: effectEntry?.effect || "No effect available",
    short_effect: effectEntry?.short_effect || "No short effect available",
  };
}

import PokemonListItem from "./PokemonListItem";

export default interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

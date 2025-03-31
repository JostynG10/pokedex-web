import PokemonAbility from "./PokemonAbility";
import PokemonType from "./PokemonType";

export default interface PokemonInfo {
  abilities: PokemonAbility[];
  types: PokemonType[];
  weight: number;
}

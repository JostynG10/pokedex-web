import PokemonAbility from "./PokemonAbility";
import PokemonType from "./PokemonType";

export default interface InfoModalProps {
  url: string;
  name: string;
  number: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  weight: number;
  closeModal: () => void;
}

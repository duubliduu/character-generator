import { useEffect, useState } from "react";
import {
  Character as CharacterType,
  createCharacter,
  createCharacters
} from "./CharacterFactory";

const useCharacters = (): [
  CharacterType[],
  () => void,
  (index: number) => void
] => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  function rollCharacters() {
    const newCharacters = createCharacters(true);
    setCharacters(newCharacters);
  }

  function rollCharacter(index: number) {
    characters.splice(index, 1, createCharacter());
    setCharacters([...characters]);
  }

  useEffect(() => {
    rollCharacters();
    return () => {};
  }, []);

  return [characters, rollCharacters, rollCharacter];
};

export default useCharacters;

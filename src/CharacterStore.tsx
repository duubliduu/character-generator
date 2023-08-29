import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  generateCharacters,
  getCharacters,
  normalizeGender,
  removeCharacter,
  saveCharacter,
} from "./helpers";
import { Character, Gender } from "./types";

type CharacterStore = {
  randomCharacters: Character[];
  savedCharacters: Character[];
  save: (index: number) => void;
  remove: (index: number) => void;
  randomize: () => void;
  race: string;
  setRace: (race: string) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
};

export const CharacterContext = createContext<CharacterStore>({
  randomCharacters: [],
  savedCharacters: [],
  save: () => {},
  remove: () => {},
  randomize: () => {},
  race: "human",
  setRace: () => {},
  gender: Gender.Male,
  setGender: () => {},
});

const CharacterProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [randomCharacters, setRandomRCharacters] = useState<Character[]>([]);
  const [savedCharacters, setSavedCharacters] = useState<Character[]>(
    getCharacters()
  );
  const [race, setRace] = useState<string>("human");
  const [gender, setGender] = useState<Gender>(Gender.Male);

  const save: CharacterStore["save"] = (index) => {
    const character = randomCharacters[index];
    saveCharacter(character);
    setSavedCharacters(getCharacters());
  };

  const remove: CharacterStore["remove"] = (index: number) => {
    removeCharacter(index);
    setSavedCharacters(getCharacters());
  };

  const randomize: CharacterStore["randomize"] = useCallback(() => {
    const characters = generateCharacters(20, race, gender);
    setRandomRCharacters(characters);
  }, [race, gender]);

  useEffect(() => {
    randomize();
  }, [randomize, race, gender]);

  return (
    <CharacterContext.Provider
      value={{
        randomCharacters,
        savedCharacters,
        save,
        remove,
        randomize,
        race,
        setRace,
        gender: normalizeGender(gender),
        setGender,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;

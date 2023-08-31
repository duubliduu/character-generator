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
  addCharacter,
  updateCharacter,
} from "./helpers";
import { Character, Gender } from "./types";

type CharacterStore = {
  randomCharacters: Character[];
  savedCharacters: Character[];
  add: (index: number) => void;
  update: (index: number, character: Character) => void;
  remove: (index: number) => void;
  randomize: () => void;
  race: string;
  setRace: (race: string) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
  absolute: boolean;
  setAbsolute: (absolute: boolean) => void;
};

export const CharacterContext = createContext<CharacterStore>({
  randomCharacters: [],
  savedCharacters: [],
  add: () => {},
  update: () => {},
  remove: () => {},
  randomize: () => {},
  race: "human",
  setRace: () => {},
  gender: Gender.Male,
  setGender: () => {},
  absolute: false,
  setAbsolute: () => {},
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
  const [absolute, setAbsolute] = useState<boolean>(false);

  const add: CharacterStore["add"] = (index) => {
    const [character] = randomCharacters.splice(index, 1);
    addCharacter(character);
    setRandomRCharacters([...randomCharacters]);
    setSavedCharacters((state) => [character, ...state]);
  };

  const update: CharacterStore["update"] = (index, character) => {
    updateCharacter(index, character);
    savedCharacters[index] = character;
    setSavedCharacters([...savedCharacters]);
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
        add,
        update,
        remove,
        randomize,
        race,
        setRace,
        gender: normalizeGender(gender),
        setGender,
        absolute,
        setAbsolute,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;

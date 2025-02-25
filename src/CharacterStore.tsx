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
  LOCAL_STORAGE_KEY,
  getSettings,
  updateSettings,
} from "./helpers";
import { Character, Gender, Storage } from "./types";

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
  isMigrated: boolean;
  migrate: () => void;
  toggleSetting: (setting: keyof Storage["settings"]) => void;
  settings: Storage["settings"];
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
  isMigrated: false,
  migrate: () => {},
  toggleSetting: () => {},
  settings: { randomSet: false, absoluteValues: false },
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
  const [isMigrated, setIsMigrated] = useState<boolean>(
    !Array.isArray(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"))
  );
  const [settings, setSettings] = useState<Storage["settings"]>(getSettings());

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

  const migrate = () => {
    const storage: Storage | Array<Character> = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );

    if (Array.isArray(storage)) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ characters: storage, settings: { randomSet: false } })
      );
      setIsMigrated(true);
      return;
    }

    setIsMigrated(true);
  };

  const toggleSetting: CharacterStore["toggleSetting"] = (setting) => {
    setSettings((state) => ({ ...state, [setting]: !state[setting] }));
    updateSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

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
        isMigrated,
        migrate,
        toggleSetting,
        settings,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;

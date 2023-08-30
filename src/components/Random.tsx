import { useContext } from "react";
import CharacterRow from "./CharacterRow";
import { CharacterContext } from "../CharacterStore";
import Table from "./Table";
import SaveButton from "./SaveButton";

function Random() {
  const { randomCharacters: characters, add } = useContext(CharacterContext);
  const handleSaveCharacter = (index: number) => add(index);

  const createActionButton = (index: number) => () =>
    <SaveButton onClick={() => handleSaveCharacter(index)} />;

  return (
    <div>
      <Table>
        {characters.map((character, index) => (
          <CharacterRow key={index} {...character} actionButton={createActionButton(index)()} />
        ))}
      </Table>
    </div>
  );
}

export default Random;

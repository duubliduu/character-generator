import { useContext } from "react";
import CharacterRow from "./CharacterRow";
import { CharacterContext } from "../CharacterStore";
import Table from "./Table";
import SaveButton from "./SaveButton";
import { downloadAsCsv } from "../helpers";

function Random() {
  const { randomCharacters: characters, add } = useContext(CharacterContext);
  const handleSaveCharacter = (index: number) => add(index);

  const createActionButton = (index: number) => () =>
    <SaveButton onClick={() => handleSaveCharacter(index)} />;

  const handlePrint = () => {
    downloadAsCsv(characters);
  };

  return (
    <div>
      <Table onPrint={handlePrint}>
        {characters.map((character, index) => (
          <CharacterRow
            key={index}
            {...character}
            actionButton={createActionButton(index)()}
          />
        ))}
      </Table>
    </div>
  );
}

export default Random;

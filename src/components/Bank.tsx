import React, { useContext } from "react";
import CharacterRow from "./CharacterRow";
import Table from "./Table";
import { CharacterContext } from "../CharacterStore";

function App() {
  const { savedCharacters, remove } = useContext(CharacterContext);

  const handleRemoveCharacter = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <Table>
        {savedCharacters.map((character, index) => (
          <CharacterRow
            key={index}
            {...character}
            onClick={() => handleRemoveCharacter(index)}
          />
        ))}
      </Table>
    </div>
  );
}

export default App;

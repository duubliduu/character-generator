import React, { useContext } from "react";
import CharacterRow from "./CharacterRow";
import { CharacterContext } from "../CharacterStore";
import Table from "./Table";

function Random() {
  const { randomCharacters: characters, save } = useContext(CharacterContext);
  const handleSaveCharacter = (index: number) => save(index);

  return (
    <div>
      <Table>
        {characters.map((character, index) => (
          <CharacterRow
            key={index}
            {...character}
            onClick={() => handleSaveCharacter(index)}
          />
        ))}
      </Table>
    </div>
  );
}

export default Random;

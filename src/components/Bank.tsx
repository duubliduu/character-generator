import { removeCharacter } from "../helpers";
import React, { useState } from "react";
import { getCharacters } from "../helpers";
import Layout from "./Layout";
import CharacterRow from "./CharacterRow";
import Table from "./Table";

function App() {
  const [characters, setCharacters] = useState(getCharacters());

  const handleRemoveCharacter = (index: number) => {
    removeCharacter(index);
    setCharacters(getCharacters());
  };

  return (
    <Layout>
      <div>
        <Table>
          {characters.map((character, index) => (
            <CharacterRow
              key={index}
              {...character}
              onClick={() => handleRemoveCharacter(index)}
            />
          ))}
        </Table>
      </div>
    </Layout>
  );
}

export default App;

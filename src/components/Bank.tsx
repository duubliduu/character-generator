import React, { useContext } from "react";
import CharacterRow from "./CharacterRow";
import Table from "./Table";
import { CharacterContext } from "../CharacterStore";
import RemoveButton from "./RemoveButton";
import { useNavigate } from "react-router-dom";

function App() {
  const { savedCharacters, remove } = useContext(CharacterContext);
  const navigate = useNavigate();

  const handleRemoveCharacter = (index: number) => {
    remove(index);
  };

  const createActionButton = (index: number) => () => {
    return <RemoveButton onClick={() => handleRemoveCharacter(index)} />;
  };

  return (
    <div>
      <Table>
        {savedCharacters.map((character, index) => (
          <CharacterRow
            key={index}
            {...character}
            actionButton={createActionButton(index)()}
            onClick={() => {
              navigate(`/character/${index}`);
            }}
          />
        ))}
      </Table>
    </div>
  );
}

export default App;

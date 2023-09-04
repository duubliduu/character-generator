import { useContext } from "react";
import CharacterRow from "./CharacterRow";
import Table from "./Table";
import { CharacterContext } from "../CharacterStore";
import RemoveButton from "./RemoveButton";
import { useNavigate } from "react-router-dom";
import { downloadAsCsv } from "../helpers";

function App() {
  const { savedCharacters: characters, remove } = useContext(CharacterContext);
  const navigate = useNavigate();

  const handleRemoveCharacter = (index: number) => {
    remove(index);
  };

  const createActionButton = (index: number) => () => {
    return <RemoveButton onClick={() => handleRemoveCharacter(index)} />;
  };

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

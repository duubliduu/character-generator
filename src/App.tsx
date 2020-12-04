import React from "react";
import "./App.css";
import Container from "./components/Container";
import Character from "./Character";
import Column from "./components/Column";
import Row from "./components/Row";
import Button from "./components/Button";
import useCharacters from "./useCharacters";

const App = () => {
  const [characters, rollCharacters, rollCharacter] = useCharacters();

  return (
    <Container>
      {characters.map((character, index) => (
        <Row key={index}>
          <Column>
            <Character key={index} {...character} />
          </Column>
          <Button onClick={() => rollCharacter(index)} title="Re-roll">
            R
          </Button>
        </Row>
      ))}
      <button onClick={() => rollCharacters()}>re-roll</button>
    </Container>
  );
};

export default App;

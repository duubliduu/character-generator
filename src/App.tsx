import React, { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import Character from './Character'

const App = () => {
  const [, reRender] = useState();
  return (
    <Container>
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <hr />
      <Character />
      <button onClick={() => reRender(new Date())}>re-roll</button>
    </Container>
  );
};

export default App;

import React from "react";
import "./App.css";
import { nameByRace } from "fantasy-name-generator";
import {
  getPersonality,
  getRandomProfession,
  getRandomRace,
  getSkills,
  getRandomGender,
  randomNumber,
} from "./helpers";
import Row from "./components/Row";
import Column from "./components/Column";
import Label from "./components/Label";

type RaceMap = { [race: string]: string };
const raceMap: RaceMap = {
  human: "human",
  troll: "demon",
  elf: "elf",
  dwarf: "dwarf",
};

const Character = () => {
  const [O, C, E, A, N] = getPersonality();
  const [agi, com, kno, mag, man, per, ste] = getSkills();
  const gender = getRandomGender();
  const race = getRandomRace();
  const name = nameByRace(raceMap[race], { gender });
  const profession = getRandomProfession();
  const proficiency = randomNumber(10);
  return (
    <Row>
      <Column>
        <div>
          <strong>{name}</strong>, {gender} {race}, {profession} {proficiency}
        </div>
      </Column>
      <Column>
        <Row>
          <Column>
            <Label>O</Label> {O}
          </Column>
          <Column>
            <Label>C</Label> {C}
          </Column>
          <Column>
            <Label>E</Label> {E}
          </Column>
          <Column>
            <Label>A</Label> {A}
          </Column>
          <Column>
            <Label>N</Label> {N}
          </Column>
        </Row>
      </Column>
      <Column>
        <Row>
          <Column center>
            <Label>AGI</Label> {agi}
          </Column>
          <Column center>
            <Label>COM</Label> {com}
          </Column>
          <Column center>
            <Label>KNO</Label> {kno}
          </Column>
          <Column center>
            <Label>MAG</Label> {mag}
          </Column>
          <Column center>
            <Label>MAN</Label> {man}
          </Column>
          <Column center>
            <Label>PER</Label> {per}
          </Column>
          <Column center>
            <Label>STE</Label> {ste}
          </Column>
        </Row>
      </Column>
    </Row>
  );
};

export default Character;

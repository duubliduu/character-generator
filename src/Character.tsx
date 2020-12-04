import React, { useEffect, useState } from "react";
import { toString, toTrait } from "./helpers";
import "./App.css";
import Row from "./components/Row";
import Column from "./components/Column";
import Label from "./components/Label";
import { Character as Props } from "./CharacterFactory";
import Harm from "./Harm";
import Hurt from "./Hurt";
import styled from "styled-components";

const getClass = (proficiency: number) => {
  if (proficiency < 3) {
    return "Peasant";
  } else if (proficiency < 5) {
    return "Vassal";
  } else if (proficiency < 7) {
    return "Lord";
  } else if (proficiency < 9) {
    return "King";
  } else if (proficiency < 11) {
    return "Emperor";
  }
  return "a God";
};

const Box = styled.strong`
  border: solid 1px;
  padding: 5px;
  margin-bottom: 5px;
`;

const Character: React.FunctionComponent<Props> = ({
  personality,
  type,
  skills,
  gender,
  race,
  name,
  profession,
  proficiency: origProficiency,
}) => {
  const [proficiency, setProficiency] = useState(origProficiency);
  const [tier, setTier] = useState("");
  const [O, C, E, A, N] = personality;
  const [agi, com, kno, mag, man, per, ste] = skills;
  const [penalty, setPenalty] = useState(0);

  useEffect(() => {
    setTier(getClass(proficiency));
  }, [proficiency]);

  const proficiencyWithPenalty = proficiency - penalty;

  return (
    <Row fluid>
      <Column half>
        <div>
          <strong>
            {tier} {name}
          </strong>
          , {type} {gender} {race},
          <span
            onClick={() => setProficiency(proficiency + 1)}
            onContextMenu={(e) => {
              e.preventDefault();
              setProficiency(proficiency - 1);
            }}
          >
            {profession} {proficiency}
          </span>
        </div>
        <div>
          <Hurt onChange={(newPenalty) => setPenalty(newPenalty)} />
        </div>
      </Column>
      <Column>
        <Row fluidInvert>
          <Column half>
            <Row>
              <Column center>
                <Label>O</Label>
                {toTrait(O)}
              </Column>
              <Column center>
                <Label>C</Label>
                {toTrait(C)}
              </Column>
              <Column center>
                <Label>E</Label>
                {toTrait(E)}
              </Column>
              <Column center>
                <Label>A</Label>
                {toTrait(A)}
              </Column>
              <Column center>
                <Label>N</Label>
                {toTrait(N)}
              </Column>
            </Row>
          </Column>
          <Column>
            <Row>
              <Column center>
                <Label>AGI</Label>
                <Box>{toString(agi, proficiencyWithPenalty)}</Box>
                {toString(agi - penalty)}
              </Column>
              <Column center>
                <Label>COM</Label>
                <Box>{toString(com, proficiencyWithPenalty)}</Box>
                {toString(com - penalty)}
              </Column>
              <Column center>
                <Label>KNO</Label>
                <Box>{toString(kno, proficiencyWithPenalty)}</Box>
                {toString(kno - penalty)}
              </Column>
              <Column center>
                <Label>MAG</Label>
                <Box title="With proficiency">
                  {toString(mag, proficiencyWithPenalty)}
                </Box>
                {toString(mag - penalty)}
              </Column>
              <Column center>
                <Label>MAN</Label>
                <Box>{toString(man, proficiencyWithPenalty)}</Box>
                {toString(man - penalty)}
              </Column>
              <Column center>
                <Label>PER</Label>
                <Box>{toString(per, proficiencyWithPenalty)}</Box>
                {toString(per - penalty)}
              </Column>
              <Column center>
                <Label>STE</Label>
                <Box>{toString(ste, proficiencyWithPenalty)}</Box>
                {toString(ste - penalty)}
              </Column>
            </Row>
          </Column>
        </Row>
      </Column>
    </Row>
  );
};

export default Character;

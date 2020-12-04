import styled from "styled-components";

type Props = {
  fluid?: boolean;
  fluidInvert?: boolean;
};

export default styled.div<Props>`
  display: flex;
  padding: 1% 0;
  margin: 0 -1%;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  ${props => {
    if (props.fluid) {
      return `@media (max-width: 768px) {
    flex-direction: column;
  }`;
    }
    if (props.fluidInvert) {
      return `@media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }`;
    }
    return "";
  }}
`;

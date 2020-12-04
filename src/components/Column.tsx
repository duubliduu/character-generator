import styled from "styled-components";

type Props = {
  half?: boolean;
  center?: boolean;
};

export default styled.div<Props>`
  display: flex;
  flex-direction: column;
  padding: 0 1%;
  flex: ${(props) => (props.half ? 1 : 2)};
  width:100%;
  white-space: nowrap;
  justify-content: center;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

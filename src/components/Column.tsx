import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1%;
  flex: 1;
  white-space: nowrap;
  justify-content: center;
  text-align: ${(props: { center?: boolean }) =>
    props.center ? "center" : "left"};
`;

import styled from "styled-components";

export const H1 = styled.div`
  display: flex;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 2em;
  width: 100%;
  justify-content: ${(props) => props.center && "center"};
`;

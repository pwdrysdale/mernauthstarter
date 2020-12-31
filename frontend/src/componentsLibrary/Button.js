import styled from "styled-components";

const ButtonStyle = styled.button`
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1em;
  border-color: ${(props) => props.theme.colors.one};
  border-width: 2px;
  border-style: solid;
  background-color: white;
  padding: 4px 15px;
  border-radius: 0;
  outline: none;

  :hover {
    background-color: ${(props) => props.theme.colors.five};
  }

  :disabled {
    background-color: tomato;
  }
`;

export const Button = (props) => {
  return (
    <ButtonStyle disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </ButtonStyle>
  );
};

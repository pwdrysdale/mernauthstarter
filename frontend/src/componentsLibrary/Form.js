import styled from "styled-components";

export const Form = styled.form``;

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.five};
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1em;
  padding: 5px;
  border: 2px solid black;
  transition: all 0.5s;

  :focus {
    background-color: ${(props) => props.theme.colors.four};
    color: white;
    border-color: ${(props) => props.theme.colors.one};
    outline: none;
  }
`;

export const Label = styled.label`
  font-family: ${(props) => props.theme.fonts.main};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`;

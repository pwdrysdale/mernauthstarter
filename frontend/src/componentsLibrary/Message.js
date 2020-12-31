import styled from "styled-components";

const MessageStyle = styled.div`
  padding: 10px;
  font-family: ${(props) => props.theme.fonts.main};
  background-color: ${(props) => {
    switch (props.variant) {
      case "danger":
        return "red";
      case "warning":
        return "orange";
      case "info":
        return "blue";
      default:
        return "green";
    }
  }};
  border-color: ${(props) => {
    switch (props.variant) {
      case "danger":
        return "red";
      case "warning":
        return "orange";
      case "info":
        return "blue";
      default:
        return "green";
    }
  }};
`;

export const Message = (props) => {
  return <MessageStyle variant={props.variant}>{props.children}</MessageStyle>;
};

import styled from "styled-components";
import theme from "../theme";

const Wrap = styled.div`
  /* these are the defaults. starts with mobile */
  margin: 55px auto 30px auto;
  @media ${theme.size.mobile} {
    /* background-color: teal; */
  }
  @media ${theme.size.small} {
    /* background-color: red; */
    width: 768px;
  }
  @media ${theme.size.medium} {
    /* background-color: green; */
    width: 1024px;
  }
  @media ${theme.size.large} {
    /* background-color: blue; */
    width: 2560px;
  }
`;

const Wrapper = (props) => {
  return <Wrap>{props.children}</Wrap>;
};

export { Wrapper };

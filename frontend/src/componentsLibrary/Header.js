import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../theme";

const HeadStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background: ${(props) => props.theme.colors.one};
  display: flex;
  justify-content: center;
`;

const HeadWrap = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
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

const TitleStyle = styled.div`
  color: white;
  font-family: ${(props) => props.theme.fonts.main};
  font-size: 1.3em;
  justify-self: flex-start;
`;

const NavContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: "center";
  margin-left: auto;
`;

const NavItemStyle = styled.div`
  color: white;
  font-family: ${(props) => props.theme.fonts.main};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${(props) => props.theme.colors.three};
  }
`;

const NavItemText = styled.div`
  padding: 0 10px;
`;

export const Img = styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  object-fit: cover;
  border-radius: 100%;
`;

export const UserWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto 0 auto;
`;

export const UserText = styled.div`
  font-family: ${(props) => props.theme.fonts.main};
  margin: 0 10px 0 0;
`;

export const HeadTitle = (props) => {
  return <TitleStyle>{props.children}</TitleStyle>;
};

export const NavItems = (props) => {
  return <NavContainer>{props.children}</NavContainer>;
};

export const NavItem = (props) => {
  return (
    <NavItemStyle onClick={props.onClick}>
      <Link
        to={props.to}
        style={{
          textDecoration: "inherit",
          color: "inherit",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <NavItemText>{props.children}</NavItemText>
      </Link>
    </NavItemStyle>
  );
};

export const Header = (props) => {
  return (
    <HeadStyle>
      <HeadWrap>{props.children}</HeadWrap>
    </HeadStyle>
  );
};

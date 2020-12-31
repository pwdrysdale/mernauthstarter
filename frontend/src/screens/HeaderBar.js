import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkAuth } from "../actions/authActions";
import {
  Header,
  HeadTitle,
  NavItems,
  NavItem,
  UserText,
  UserWrap,
  Img,
} from "../componentsLibrary/Header";

const HeaderBar = () => {
  const dispatch = useDispatch();

  const authLogin = useSelector((state) => state.authLogin);
  const { user } = authLogin;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // Menu items when logged in (not including shared items)
  const LoggedInItems = () => {
    return (
      <>
        <NavItem to="/" onClick={logoutHandler}>
          Logout
        </NavItem>
        <NavItem to="/myprofile">My Profile</NavItem>
      </>
    );
  };

  // Menu items when logged out (not including shared items)
  const LoggedOutItems = () => {
    return (
      <>
        <NavItem to="/login">Login</NavItem>
        <NavItem to="/register">Register</NavItem>
      </>
    );
  };

  return (
    <Header>
      <HeadTitle>Starter App</HeadTitle>
      <UserWrap>
        <UserText style={{ color: "white" }}>
          {user && user.displayName}
        </UserText>
        {user && <Img src={user.image} size="30px"></Img>}
      </UserWrap>
      <NavItems>
        <NavItem to="/">No where</NavItem>
        {user ? <LoggedInItems /> : <LoggedOutItems />}
      </NavItems>
    </Header>
  );
};

export default HeaderBar;

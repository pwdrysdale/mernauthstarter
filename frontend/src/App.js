import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import Header from "./screens/HeaderBar";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MyProfile from "./screens/MyProfile";
import ForgotPassword from "./screens/ForgotPassword";
import NewPassword from "./screens/NewPassword";
import { Wrapper } from "./componentsLibrary/Wrapper";
require("typeface-inconsolata");

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Header />
          <Wrapper>
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/myprofile" component={MyProfile} exact />
            <Route path="/forgot" component={ForgotPassword} exact />
            <Route path="/reset/:id" component={NewPassword} exact />
          </Wrapper>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;

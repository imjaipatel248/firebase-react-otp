import { Route, Switch } from "react-router-dom";
import Home from "../../src//Home";
import LoginScreen from "../Auth/LoginScreen";
// import SignUp from "../../src/user/SignUp";
// import SignIn from "../../src/user/SignIn";
import NavBar from "../Common/NavBar";
import CommunityFromScreen from "../Screens/Community/CommunityFromScreen";
import ShowCommunityScreen from "../Screens/Community/ShowCommunityScreen";
// import ProfileScreen from "../user/ProfileScreen";
// import UsersScreen from "../user/UsersScreen";
// import EditScreen from "../user/EditScreen";
const Routes = () => (
  <div>
    <NavBar></NavBar>
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/signIn" component={LoginScreen}></Route>
      <Route exact path="/community" component={CommunityFromScreen}></Route>
      <Route
        exact
        path="/show-community"
        component={ShowCommunityScreen}
      ></Route>
      {/*<Route exact path="/users" component={UsersScreen}></Route>
      <Route exact path="/user/edit/:userId" component={EditScreen}></Route> */}
    </Switch>
  </div>
);
export default Routes;

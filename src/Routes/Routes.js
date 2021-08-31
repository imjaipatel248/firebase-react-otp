import { Route, Switch } from "react-router-dom";
import LoginScreen from "../Auth/LoginScreen";
import NavBar from "../Common/NavBar";
import CommunityFromScreen from "../Screens/Community/CommunityFromScreen";
import ShowCommunityScreen from "../Screens/Community/ShowCommunityScreen";
import HomeScreen from "../Screens/Home/HomeScreen";
const Routes = () => (
  <div>
    <NavBar></NavBar>
    <Switch>
      <Route exact path="/" component={HomeScreen}></Route>
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

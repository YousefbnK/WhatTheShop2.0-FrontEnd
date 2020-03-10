import { createStackNavigator } from "react-navigation-stack";

// Components
import ProfileScreen from "../components/Profile";
import LoginScreen from "../components/Login";

const ProfileStack = createStackNavigator(
  {
    Register: Register,
    Login: LoginScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Register",
    defaultNavigationOptions: {
      title: "The Coral Farm"
    }
  }
);

export default ProfileStack;

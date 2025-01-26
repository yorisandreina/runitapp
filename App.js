import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import RaceDetails from "./screens/RaceDetails";
import Workouts from "./screens/Workouts";
import MyAchievements from "./screens/MyAchievements";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Workouts"
          component={Workouts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RaceDetails"
          component={RaceDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAchievements"
          component={MyAchievements}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
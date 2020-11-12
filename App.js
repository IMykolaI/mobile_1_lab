import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";

import SignInScreen from "./components/screens/SignInScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyA9qRfZQS7fwWZC8ooU2Q8tq2_ztdUyJog",
  authDomain: "lab-1-mobile.firebaseapp.com",
  databaseURL: "https://lab-1-mobile.firebaseio.com",
  projectId: "lab-1-mobile",
  storageBucket: "lab-1-mobile.appspot.com",
  messagingSenderId: "270862084586",
  appId: "1:270862084586:web:e49a91ccc38531b08f2a93"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

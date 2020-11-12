import React from "react";
import { View, Text, StyleSheet } from "react-native";

import firebase from "firebase";

import { Button, CardSection } from "../common";

export default function WelcomeScreen({ navigation }) {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(navigation.navigate("Sign In"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome, {firebase.auth().currentUser.displayName}
      </Text>
      <View style={styles.button}>
        <Button onPress={signOut.bind(this)}>Sign Out</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative"
  },
  text: {
    fontSize: 18
  }
});

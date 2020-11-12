import React from "react";
import { StyleSheet, Text, Button as ReactButton } from "react-native";

import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner } from "../common";

export default function SingInScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  onButtonPress = () => {
    setError("");
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(onSignInSuccess.bind(this))
      .catch(onSignInFail.bind(this));
  };

  onSignInFail = () => {
    setError("Authentication Failed");
    setLoading(false);
  };

  onSignInSuccess = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
    navigation.navigate("Welcome");
  };

  renderButton = () => {
    if (loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={onButtonPress.bind(this)}>Sign in</Button>;
  };

  toSignUp = () => {
    setEmail("");
    setPassword("");
    setError("");
    setLoading(false);
    navigation.navigate("Sign Up");
  };

  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder="enter email"
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry
          placeholder="password"
          label="Password"
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </CardSection>

      <CardSection>{renderButton()}</CardSection>

      <Text style={styles.errorTextStyle}>{error}</Text>

      <ReactButton title="Sign Up" onPress={() => toSignUp()} />
    </Card>
  );
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
});

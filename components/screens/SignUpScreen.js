import React from "react";
import { StyleSheet, Text, Button as ReactButton } from "react-native";

import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner } from "../common";

export default function SingUpScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [wrongEmail, setEmailWrong] = React.useState(false);
  const [wrongPhone, setPhoneWrong] = React.useState(false);
  const [wrongPassword, setPasswordWrong] = React.useState(false);

  validateEmail = emailIn => {
    const matcher = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return matcher.test(String(emailIn).toLowerCase());
  };

  validatePassword = passwordIn => {
    if (passwordIn.toString() < 8) {
      return false;
    }
    return true;
  };

  validatePhone = phoneNumber => {
    const matcher = /\d/g;
    return matcher.test(String(phoneNumber)) && phoneNumber.length === 10;
  };

  onButtonPress = () => {
    setError("");
    setLoading(true);

    if (validateEmail(email)) {
      if (validatePassword(password)) {
        if (validatePhone(phone)) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              res.user.updateProfile({
                displayName: name
              });
            })
            .then(onSignUpSuccess.bind(this))
            .catch(onSignUpFail.bind(this));
        } else {
          setPhoneWrong(true);
          onSignUpFail("Wrong phone format");
        }
      } else {
        setPasswordWrong(true);
        onSignUpFail("Password must have more than 8 symbols");
      }
    } else {
      setEmailWrong(true);
      onSignUpFail("Wrong Email");
    }
  };

  onSignUpFail = errorIn => {
    setError(errorIn);
    setLoading(false);
  };

  onSignUpSuccess = () => {
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setError("");
    setLoading(false);
    firebase.auth().signInWithEmailAndPassword(email, password);
    navigation.navigate("Welcome");
  };

  renderButton = () => {
    if (loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={onButtonPress.bind(this)}>Sign up</Button>;
  };

  renderEmailInput = () => {
    if (wrongEmail) {
      return (
        <Input
          label="Email"
          value={email}
          onChangeText={email => {
            setEmail(email);
            setEmailWrong(false);
            setError("");
          }}
          placeholder="enter email"
          wrongInput
        />
      );
    }
    return (
      <Input
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
        placeholder="enter email"
      />
    );
  };

  renderPhoneInput = () => {
    if (wrongPhone) {
      return (
        <Input
          placeholder="phone"
          label="Phone"
          value={phone}
          onChangeText={phone => {
            setPhone([phone]);
            setPhoneWrong(false);
            setError("");
          }}
          wrongInput
        />
      );
    }
    return (
      <Input
        placeholder="phone"
        label="Phone"
        value={phone}
        onChangeText={phone => setPhone(phone)}
      />
    );
  };

  renderPasswordInput = () => {
    if (wrongPassword) {
      return (
        <Input
          secureTextEntry
          placeholder="password"
          label="Password"
          value={password}
          onChangeText={password => {
            setPassword(password);
            setPasswordWrong(false);
            setError("");
          }}
          wrongInput
        />
      );
    }
    return (
      <Input
        secureTextEntry
        placeholder="password"
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
    );
  };

  toSignIn = () => {
    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setError("");
    setLoading(false);
    navigation.navigate("Sign In");
  };

  return (
    <Card>
      <CardSection>{renderEmailInput()}</CardSection>

      <CardSection>
        <Input
          placeholder="name"
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
        />
      </CardSection>

      <CardSection>{renderPhoneInput()}</CardSection>

      <CardSection>{renderPasswordInput()}</CardSection>

      <CardSection>{renderButton()}</CardSection>

      <Text style={styles.errorTextStyle}>{error}</Text>

      <ReactButton
        title="Sign In"
        onPress={() => navigation.navigate("Sign In")}
      />
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

import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  wrongInput
}) => {
  const { inputStyle, labelStyle, containerStyle, wrongInputStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={wrongInput ? wrongInputStyle : inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  wrongInputStyle: {
    color: "#000",
    padding: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: "red"
  }
};

export { Input };

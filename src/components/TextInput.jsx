import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    borderColor: "grey",
    borderRadius: 5,
    borderStyle: "solid",
    minHeight: 50,
    borderWidth: 1,
    padding: 10
  },
  textError: {
    borderColor: theme.colors.errorColor
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style,
    styles.textInput,
    error && styles.textError
  ];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
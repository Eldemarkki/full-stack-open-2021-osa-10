import { Formik } from "formik";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../../theme";
import FormikTextInput from "../FormikTextInput";
import * as Yup from "yup";
import { useHistory } from "react-router";

import Text from "../Text";
import useSignIn from "../../hooks/useSignIn";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

const initialValues = {
  username: "",
  password: ""
};

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: theme.colors.primary,
    margin: 15,
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

export const SignInForm = ({ onSubmit }) => {
  return <View>
    <FormikTextInput name="username" placeholder="Username" testID="usernameField" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="passwordField" />
    <Pressable onPress={onSubmit} style={styles.signInButton} testID="submitButton">
      <Text color="inverted" fontWeight="bold">Sign In</Text>
    </Pressable>
  </View>;
};

export const SignInContainer = ({ onSubmit }) => {
  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>;
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <View>
    <SignInContainer onSubmit={onSubmit} />
  </View>;
};

export default SignIn;
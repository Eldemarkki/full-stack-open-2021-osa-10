import { Formik } from "formik";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import * as Yup from "yup";

import Text from "./Text";

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

const SignInForm = ({ onSubmit }) => {
  return <View>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <Pressable onPress={onSubmit} style={styles.signInButton}>
      <Text color="inverted" fontWeight="bold">Sign In</Text>
    </Pressable>
  </View>;
};

const SignIn = () => {

  const onSubmit = (values) => {
    console.log(values);
  };

  return <View>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  </View>;
};

export default SignIn;
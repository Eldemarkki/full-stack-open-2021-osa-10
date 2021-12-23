import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import * as Yup from "yup";
import FormikTextInput from "../FormikTextInput";
import theme from "../../theme";
import Text from "../Text";
import { Formik } from "formik";
import useSignIn from "../../hooks/useSignIn";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations";
import { useHistory } from "react-router-native";

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: theme.colors.primary,
    margin: 15,
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: ""
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(1, "Username must be at least 1 character")
    .max(30, "Username must not exceed 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must not exceed 50 characters"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required")
});

const SignUpForm = ({ onSubmit }) => {
  return <View>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    <FormikTextInput name="passwordConfirmation" placeholder="Confirm password" secureTextEntry />
    <Pressable onPress={onSubmit} style={styles.submitButton}>
      <Text color="inverted" fontWeight="bold">Sign up</Text>
    </Pressable>
  </View>;
};

const SignUpContainer = ({ onSubmit }) => {
  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>;
};

export const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const history = useHistory();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const credentials = {
      username: values.username,
      password: values.password
    };
    const response = await mutate({
      variables: credentials
    });
    if (response.data) {
      const r = await signIn(credentials);
      if (r.data.authorize.accessToken) {
        history.push("/repositories");
      }
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
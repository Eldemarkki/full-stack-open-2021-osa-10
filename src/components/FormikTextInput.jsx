import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  formikTextInput: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  errorText: {
    marginTop: 5,
    marginRight: 15,
    marginLeft: 15,
    color: theme.colors.errorColor
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.formikTextInput}
        {...props}
      />
      {showError && <Text style={[styles.errorText]}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
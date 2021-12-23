import React from "react";
import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "../FormikTextInput";
import * as Yup from "yup";
import theme from "../../theme";
import Text from "../Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../../graphql/mutations";
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
  repositoryOwnerName: "",
  repositoryName: "",
  rating: "",
  text: ""
};

const validationSchema = Yup.object().shape({
  repositoryOwnerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .integer("Rating must be an integer")
    .min(0, "Rating must be more than 0")
    .max(100, "Rating must be less than 100")
    .required("Rating is required"),
  text: Yup.string()
});

const CreateReviewForm = ({ onSubmit }) => {
  return <View>
    <FormikTextInput name="repositoryOwnerName" placeholder="Repository owner name" />
    <FormikTextInput name="repositoryName" placeholder="Repository name" />
    <FormikTextInput keyboardType="number-pad" name="rating" placeholder="Rating between 0 and 100" />
    <FormikTextInput name="text" placeholder="Review" multiline />
    <Pressable onPress={onSubmit} style={styles.submitButton}>
      <Text color="inverted" fontWeight="bold">Create a review</Text>
    </Pressable>
  </View>;
};

const CreateReviewContainer = ({ onSubmit }) => {
  return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>;
};

export const CreateReviewView = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const response = await mutate({
      variables: {
        repositoryName: values.repositoryName,
        ownerName: values.repositoryOwnerName,
        rating: Number(values.rating),
        text: values.text
      },
    });

    const fullId = response.data.createReview.id;
    const id = fullId.slice(37);
    history.push(`/repository/${id}`);
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};
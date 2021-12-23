import { useMutation } from "@apollo/client";
import React from "react";
import { View, StyleSheet, Pressable, Linking, Alert } from "react-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 15
  },
  leftContainer: {
    marginRight: 10,
    display: "flex",
    alignItems: "center"
  },
  rightContainer: {
    width: 0, // Needed for text to wrap
    flexGrow: 1 // Needed for text to wrap
  },
  ratingText: {
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: theme.colors.blue,
    borderColor: theme.colors.blue,
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 2
  },
  dateText: {
    color: "#5a5e60",
    marginBottom: 3
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 5,
    paddingRight: 5
  },
  baseButton: {
    margin: 15,
    minHeight: 40,
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  viewRepositoryButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteReviewButton: {
    backgroundColor: theme.colors.errorColor
  }
});

const formatDate = (d) => {
  return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
};

export const ReviewItem = ({
  id,
  title,
  rating,
  createdAt,
  description,
  onDelete = () => { },
  url = "",
  showButtons = false
}) => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const openInGithub = () => {
    Linking.openURL(url);
  };


  const requestDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            const response = await mutate({ variables: { id } });
            if (response.data) {
              onDelete();
            }
          }
        }
      ]
    );
  };

  const buttons = showButtons ? <View style={styles.buttonsContainer}>
    <Pressable onPress={openInGithub} style={{ ...styles.baseButton, ...styles.viewRepositoryButton }}><Text color="inverted">View repository</Text></Pressable>
    <Pressable onPress={requestDelete} style={{ ...styles.baseButton, ...styles.deleteReviewButton }}><Text color="inverted">Delete review</Text></Pressable>
  </View> : null;

  return <View style={styles.container}>
    <View style={styles.reviewContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text fontSize="subheading" fontWeight="bold" testID="reviewerName">{title}</Text>
        <Text style={styles.dateText}>{formatDate(new Date(createdAt))}</Text>
        <Text>{description}</Text>
      </View>
    </View>
    {buttons}
  </View>;
};
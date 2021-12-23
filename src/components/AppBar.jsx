import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    minHeight: 80,
    display: "flex",
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  appBarTitle: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  appBarLink: {
    marginRight: 20
  }
});

const AppBarTab = (props) => {
  return <Link to={props.to} style={styles.appBarLink}>
    <Text style={styles.appBarTitle}>{props.title}</Text>
  </Link>;
};

const SignOutButton = (props) => {
  return <Pressable style={styles.appBarLink} onPress={props.signOut}><Text style={styles.appBarTitle}>{props.title}</Text></Pressable>;
};

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(GET_AUTHORIZED_USER);
  const isLoggedIn = data && data.authorizedUser;

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab to="/" title="Repositories" />
      {!isLoggedIn && <AppBarTab to="/signin" title="Sign In" />}
      {!isLoggedIn && <AppBarTab to="/signup" title="Sign up" />}
      {isLoggedIn && <AppBarTab to="/createReview" title="Create a review" />}
      {isLoggedIn && <AppBarTab to="/myReviews" title="My reviews" />}
      {isLoggedIn && <SignOutButton signOut={signOut} title="Sign out" />}
    </ScrollView>
  </View>;
};

export default AppBar;
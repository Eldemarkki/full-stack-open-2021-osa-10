import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

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

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab to="/" title="Repositories" />
      <AppBarTab to="/signin" title="Sign In" />
    </ScrollView>
  </View>;
};

export default AppBar;
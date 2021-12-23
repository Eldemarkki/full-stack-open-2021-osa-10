import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Switch, Route, Redirect } from "react-router-native";
import SignIn from "./SignIn";
import SingleRepositoryView from "./SingleRepositoryView";
import { CreateReviewView } from "./CreateReviewForm/CreateReviewView";
import SignUp from "./SignUp";
import { MyReviews } from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/repository/:id" exact>
          <SingleRepositoryView />
        </Route>
        <Route path="/createReview" exact>
          <CreateReviewView />
        </Route>
        <Route path="/myReviews" exact >
          <MyReviews />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
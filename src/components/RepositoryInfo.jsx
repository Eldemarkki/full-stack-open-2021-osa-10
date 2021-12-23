import React from "react";
import { View } from "react-native";
import { ItemSeparator } from "./ItemSeparator";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

export const RepositoryInfo = ({ repository, loading }) => {
  if (loading) return <Text>Loading...</Text>;
  return <View>
    <RepositoryItem {...repository} showGithubLink />
    <ItemSeparator />
  </View>;
};
import React from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingBottom: 15
  },
  topContainer: {
    display: "flex",
    flexDirection: "row"
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  imageContainer: {
    minWidth: 60,
    padding: 15,
    flexGrow: 0,
    display: "flex",
    alignItems: "center"
  },
  infoContainer: {
    flexGrow: 1,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    width: 0
  },
  statisticsItem: {
    display: "flex",
    alignItems: "center"
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  languageBubble: {
    backgroundColor: theme.colors.blue,
    borderRadius: 5,
    alignSelf: "flex-start",
    padding: 5,
    maxWidth: "auto",
    marginTop: 5
  },
  descriptionText: {
    marginTop: 5,
  },
  statisticsItemValue: {
    marginBottom: 2
  },
  linkButton: {
    backgroundColor: theme.colors.blue,
    textAlign: "center",
    minHeight: 50,
    textAlignVertical: "center",
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    fontSize: 13,
    borderRadius: 5
  }
});

const formatNumber = (num) => {
  if (num <= 1000) return num;
  return ((num / 1000).toFixed(1) + "k").replace(".0", "");
};

const LanguageBubble = (props) => {
  return <View style={styles.languageBubble}>
    <Text color="inverted" testID="language">{props.language}</Text>
  </View>;
};

const LinkButton = ({ url, title }) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return <Text onPress={handlePress} style={styles.linkButton} color="inverted" fontWeight="bold">{title}</Text>;
};

const RepositoryItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.avatarImage} source={{ uri: props.ownerAvatarUrl }} />
        </View>
        <View style={styles.infoContainer}>
          <Text fontSize="subheading" fontWeight="bold" testID="repositoryName">{props.fullName}</Text>
          <Text style={styles.descriptionText} testID="description">{props.description}</Text>
          <LanguageBubble language={props.language} />
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statisticsItem}>
          <Text fontWeight="bold" style={styles.statisticsItemValue} testID="stargazersCount">{formatNumber(props.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text fontWeight="bold" style={styles.statisticsItemValue} testID="forksCount">{formatNumber(props.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text fontWeight="bold" style={styles.statisticsItemValue} testID="reviewCount">{formatNumber(props.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statisticsItem}>
          <Text fontWeight="bold" style={styles.statisticsItemValue} testID="ratingAverage">{formatNumber(props.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {props.showGithubLink && <LinkButton title="Open in GitHub" url={props.url} />}
    </View>
  );
};

export default RepositoryItem;

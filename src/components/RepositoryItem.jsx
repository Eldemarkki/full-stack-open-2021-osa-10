import React from "react";
import { Image, StyleSheet, View } from "react-native";
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
    backgroundColor: "#0463d8",
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
  }
});

const formatNumber = (num) => {
  if (num <= 1000) return num;
  return ((num / 1000).toFixed(1) + "k").replace(".0", "");
};

const StatisticsItem = (props) => {
  return <View style={styles.statisticsItem}>
    <Text fontWeight="bold" style={styles.statisticsItemValue}>{formatNumber(props.value)}</Text>
    <Text>{props.name}</Text>
  </View>;
};

const LanguageBubble = (props) => {
  return <View style={styles.languageBubble}>
    <Text color="inverted">{props.language}</Text>
  </View>;
};

const RepositoryItem = (props) => {
  const data = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.avatarImage} source={{ uri: data.ownerAvatarUrl }} />
        </View>
        <View style={styles.infoContainer}>
          <Text fontSize="subheading" fontWeight="bold">{data.fullName}</Text>
          <Text style={styles.descriptionText}>{data.description}</Text>
          <LanguageBubble language={data.language} />
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatisticsItem value={data.stargazersCount} name="Stars" />
        <StatisticsItem value={data.forksCount} name="Forks" />
        <StatisticsItem value={data.reviewCount} name="Reviews" />
        <StatisticsItem value={data.ratingAverage} name="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;

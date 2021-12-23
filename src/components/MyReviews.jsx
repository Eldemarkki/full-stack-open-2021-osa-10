import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { ItemSeparator } from "./ItemSeparator";
import { ReviewItem } from "./ReviewItem";
import Text from "./Text";

export const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: {
      includeReviews: true
    },
    fetchPolicy: "cache-and-network"
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data.authorizedUser.reviews.edges
    .map(node => node.node)
    .map(review => ({
      title: review.repository.fullName,
      createdAt: review.createdAt,
      id: review.id,
      description: review.text,
      rating: review.rating,
      url: review.repository.url
    }));

  return (
    <FlatList
      data={reviews}
      renderItem={d =>
        <ReviewItem
          {...d.item}
          showButtons
          onDelete={refetch}
        />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

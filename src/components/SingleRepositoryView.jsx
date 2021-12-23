import React from "react";
import { FlatList } from "react-native";
import { useParams } from "react-router";
import useRepository from "../hooks/useRepository";
import { ItemSeparator } from "./ItemSeparator";
import { RepositoryInfo } from "./RepositoryInfo";
import { ReviewItem } from "./ReviewItem";
import Text from "./Text";

const SingleRepositoryView = () => {
  const params = useParams();
  const { repository, loading, fetchMore } = useRepository({
    id: params.id,
    first: 8
  });

  if (loading || !repository) return <Text>Loading...</Text>;

  const reviews = repository.reviews.edges
    .map(node => node.node)
    .map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.user.username,
      createdAt: review.createdAt,
      description: review.text
    }));

  return (
    <FlatList
      data={reviews}
      renderItem={d => {
        return <ReviewItem {...d.item} />;
      }}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<RepositoryInfo loading={loading} repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepositoryView;

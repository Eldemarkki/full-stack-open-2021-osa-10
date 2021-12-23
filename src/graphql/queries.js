import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection:$orderDirection, searchKeyword:$searchKeyword, first:$first, after:$after) {
      edges{
        node {
          id,
          ownerAvatarUrl,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage,
          url,
        }
      },
      pageInfo {
        hasNextPage,
        startCursor,
        endCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id,
      ownerAvatarUrl,
      fullName,
      description,
      language,
      stargazersCount,
      forksCount,
      reviewCount,
      ratingAverage,
      url,
      reviews(first:$first, after:$after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        },
        pageInfo {
          hasNextPage,
          startCursor,
          endCursor
        }
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              fullName
              url
            }
            repositoryId
            id
            text
            rating
            createdAt
          }
        }
      }
    }
  }
`;

import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useHistory } from "react-router";
import useRepositories from "../../hooks/useRepositories";
import theme from "../../theme";
import RepositoryItem from "../RepositoryItem";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce/lib";
import { ItemSeparator } from "../ItemSeparator";

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemSeparator
  },
  searchbar: {
    marginBottom: 10
  }
});

export const RepositoryListContainer = ({ sorting, sortings, setSorting, repositories, searchKeyword, setSearchKeyword, onEndReach }) => {
  const history = useHistory();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<View style={styles.header}>
        <Searchbar style={styles.searchbar} value={searchKeyword} onChangeText={setSearchKeyword} />
        <Picker
          selectedValue={sorting}
          onValueChange={itemValue => setSorting(itemValue)}>
          {sortings.map(s => (
            <Picker.Item label={s.label} value={s.value} key={s.value} />
          ))}
        </Picker></View>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={d => <Pressable onPress={() => history.push(`/repository/${d.item.id}`)}><RepositoryItem {...d.item} /></Pressable>}
      keyExtractor={(item) => item.fullName}
    />
  );
};

const RepositoryList = () => {
  const sortings = [
    {
      label: "Latest repositories", value: {
        orderBy: "CREATED_AT",
        orderDirection: "DESC"
      }
    },
    {
      label: "Highest rated repositories", value: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC"
      }
    },
    {
      label: "Lowest rated repositories", value: {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC"
      }
    }
  ];

  const [sorting, setSorting] = useState(sortings[0].value);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [bouncedKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories({
    ...sorting,
    searchKeyword: bouncedKeyword,
    first: 8
  });

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer
    repositories={repositories}
    sorting={sorting}
    sortings={sortings}
    setSorting={setSorting}
    setSearchKeyword={setSearchKeyword}
    onEndReach={onEndReach} />;
};


export default RepositoryList;
import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import {LIST_ITEMS} from './Lists';

const ListItem = ({item}) => {
  const REMOVE_LIST_ITEM = gql`
    mutation removeListItemMutation($id: ID!) {
      removeListItem(id: $id) {
        id
        description
      }
    }
  `;

  const [removeListItemMutation] = useMutation(REMOVE_LIST_ITEM, {
    update(
      cache,
      {
        data: {removeListItem},
      },
    ) {
      const {listItems} = cache.readQuery({query: LIST_ITEMS});
      const newArray = listItems.filter(
        listItem => listItem.id !== removeListItem.id,
      );

      cache.writeQuery({
        query: LIST_ITEMS,
        data: {listItems: newArray},
      });
    },
  });

  const removeItem = () => {
    removeListItemMutation({variables: {id: item.id}});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}> {item.description} </Text>
      <Text>{item.timestamp}</Text>
      <Button
        color="red"
        title="Delete"
        onPress={removeItem}
        style={styles.delete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  description: {
    flex: 1,
  },
  delete: {
    flex: 1,
  },
});

export default ListItem;

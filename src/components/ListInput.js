import React, {useState} from 'react';
import {TextInput, Button, View, StyleSheet} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import {LIST_ITEMS} from './Lists';

const ADD_LIST_ITEM = gql`
  mutation createListItemMutation(
    $description: String!
    $isPurchased: Boolean!
  ) {
    createListItem(description: $description, isPurchased: $isPurchased) {
      id
      description
      isPurchased
    }
  }
`;

const ListInput = () => {
  const [value, onChangeText] = useState('');
  const [addListItem] = useMutation(ADD_LIST_ITEM, {
    update(
      cache,
      {
        data: {createListItem},
      },
    ) {
      const {listItems} = cache.readQuery({query: LIST_ITEMS});
      cache.writeQuery({
        query: LIST_ITEMS,
        data: {listItems: listItems.concat([createListItem])},
      });
    },
  });

  return (
    <View style={styles.listInput}>
      <TextInput
        style={{flex: 2}}
        onChangeText={text => onChangeText(text)}
        placeholder="Enter item"
        value={value}
      />
      <Button
        title="Add Item"
        // style={{flex: 1}}
        onPress={e => {
          addListItem({
            variables: {description: value, isPurchased: false},
          });
          onChangeText('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListInput;

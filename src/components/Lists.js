import React from 'react';
import {Text, FlatList, View} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import ListInput from './ListInput';
import ListItem from './ListItem';

export const LIST_ITEMS = gql`
  query {
    listItems {
      id
      description
      isPurchased
      timestamp @client
    }
  }
`;

const Lists = () => {
  const {loading, error, data} = useQuery(LIST_ITEMS);
  if (loading) {
    return <Text>Loading ...</Text>;
  }

  if (error) {
    console.log('Error', error);
    return <Text>Sorry, something went wrong</Text>;
  }

  if (data) {
    const {listItems} = data;
    console.log('data', listItems);
    return (
      <View>
        <ListInput />
        <FlatList
          data={listItems}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  return <React.Fragment />;
};

export default Lists;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloProvider,
} from '@apollo/client';

import Lists from './src/components/Lists';

export default function App() {

  const typeDefs = gql`
    extend type ListItem {
      timestamp: String!
    }
  `;

  const resolvers = {
    ListItem: {
      timestamp: () => {
        return new Date().toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
    },
  };

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
    }),
    typeDefs,
    resolvers,
  });

  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <View style={styles.body}>
          <Lists />
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

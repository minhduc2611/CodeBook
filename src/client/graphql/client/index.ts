import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BASE_URL, NODE_ENV, PORT } from './../../../shared/constants/env';

export const AppApolloClient = new ApolloClient({
  uri: NODE_ENV === 'development' ? `${BASE_URL}:${PORT}/graphql` : `${BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

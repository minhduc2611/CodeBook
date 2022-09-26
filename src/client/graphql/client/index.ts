import {
    ApolloClient, InMemoryCache
} from '@apollo/client';
import { BASE_URL, PORT } from './../../../shared/constants/env';
  
export const AppApolloClient = new ApolloClient({
    uri: `${BASE_URL}:${PORT}/graphql`,
    cache: new InMemoryCache()
  });
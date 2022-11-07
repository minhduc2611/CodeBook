import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client';
import {
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_PORT
} from 'src/client/constants/client-env';
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const AppApolloClient = new ApolloClient({
  uri:
    NEXT_PUBLIC_NODE_ENV === 'development'
      ? `${NEXT_PUBLIC_BASE_URL}:${NEXT_PUBLIC_PORT}/graphql`
      : `${NEXT_PUBLIC_BASE_URL}/graphql`,
  cache: new InMemoryCache({}),
  defaultOptions: defaultOptions,

});

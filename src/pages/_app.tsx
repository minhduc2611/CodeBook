import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { AppApolloClient } from 'src/client/graphql/client';
import NavbarLayout from './../client/components/navbar-layout/NavbarLayout';
import { store } from './../client/state';
import './../client/styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={AppApolloClient}>
      <Provider store={store}>
        <CssBaseline />
        <NavbarLayout>
          <Component {...pageProps} />
        </NavbarLayout>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

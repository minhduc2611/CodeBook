import { ApolloProvider } from '@apollo/client';
import { CircularProgress, CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import NavbarLayout from './../client/components/navbar-layout/NavbarLayout';
import { AppApolloClient } from './../client/graphql/client';
import { store } from './../client/state';
import './../client/styles/globals.scss';
import Utilities from './_utilities';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  // (<div>Loading....{/*I have an animation here*/}</div>);
  return (
    <ApolloProvider client={AppApolloClient}>
      <Provider store={store}>
        <CssBaseline />
        {loading ? (
          <p className="justify-content-center flex">
            <CircularProgress />
            <p>Page in progress</p>
          </p>
        ) : (
          <NavbarLayout>
            <Component {...pageProps} />
          </NavbarLayout>
        )}
        <Utilities />
      </Provider>
    </ApolloProvider>
  );
};

export default App;

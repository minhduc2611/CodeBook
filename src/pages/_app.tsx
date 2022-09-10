import { CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider } from 'react-redux';
import NavbarLayout from '../components/navbar-layout/NavbarLayout';
import { store } from '../state';
import '../styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </Provider>
  );
};

export default App;

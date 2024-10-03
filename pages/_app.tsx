import { Provider } from 'react-redux';
import Head from 'next/head';

import { store } from 'core/store';
import { AppPropsWithLayout } from 'core/types';

import ModalController from 'components/Common/ModalController';

import 'antd/dist/antd.css';
import '../styles/styles.scss';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <title>Team area</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />s
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="description" content="Team area" />
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <ModalController />
      </Provider>
    </>
  );
}

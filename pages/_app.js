import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '@/assets/redux/store';

import Layout from '@/components/layout/defaultLayout';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

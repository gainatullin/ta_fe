import { NextPageWithLayout } from 'core/types';

import { getMainLayout } from 'components/Main/MainLayout';

const Home: NextPageWithLayout = () => {
  return (
    <section className="container">
      <h1>Home</h1>
    </section>
  );
};

Home.getLayout = getMainLayout;

export default Home;

import { Outlet } from 'react-router';
import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Home;

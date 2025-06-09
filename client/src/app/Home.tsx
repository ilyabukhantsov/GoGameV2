import { Outlet } from 'react-router';
import Layout from './Layout';
import { $api } from '../shared/api/api.ts';

const Home = () => {
  const getUsers = () => {
    $api('users')
      .then((json) => json.json())
      .then((data) => console.log('data from Home.tsx ', data));
  };

  return (
    <Layout>
      <Outlet />
      <button onClick={getUsers}>getUsers</button>
    </Layout>
  );
};

export default Home;

import { Outlet } from 'react-router';
import Layout from './Layout';
import { $api } from '../shared/api/api.ts';
import { useAuth } from './context/auth/useAuth.ts';
import AddScrimButton from '../features/AddScrimButton/AddScrimButton.tsx';

const Home = () => {
  const { user } = useAuth();
  const getUsers = () => {
    $api('users')
      .then((json) => json.json())
      .then((data) => console.log('users data from Home.tsx ', data));
  };
  const getScrims = () => {
    $api('scrims')
      .then((json) => json.json())
      .then((data) => console.log('GET scrims data from Home.tsx ', data));
  };
  const postScrim = () => {
    $api('scrims', {
      method: 'POST',
      body: JSON.stringify({
        score: '13-11',
        map: 'Ascent',
        opponentName: 'Team 1',
        opponentLink: 'https://pracc.com/',
        resultImage: null,
        time: '03.06.2025 13:30',
        allowedUsers: [],
        createdBy: user?.id,
      }),
    })
      .then((json) => json.json())
      .then((data) => console.log('POST scrims data from Home.tsx ', data));
  };

  return (
    <Layout>
      <Outlet />
      <button onClick={getUsers}>getUsers</button>
      <button onClick={getScrims}>getScrims</button>
      <button onClick={postScrim}>postScrim</button>
      <AddScrimButton />
    </Layout>
  );
};

export default Home;

import { Link } from 'react-router';
import { useAuth } from './context/auth/useAuth';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {user ? <p>{user.email}</p> : <p><Link to={'/login'}>Login</Link></p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;

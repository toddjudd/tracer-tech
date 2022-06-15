import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import './App.css';
import auth from './firebase';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { useAuthState } from 'react-firebase-hooks/auth';

const useOauth = () => {
  let match = useRouteMatch('/login/oauth/authorize');
  let location = useLocation();
  let query = queryString.parse(location.search);
  console.log(location);
  if (!match || !query.client_id) return;
};
const App = () => {
  const [user] = useAuthState(auth);
  useOauth();
  return <div className='App'>{user ? <LoggedIn /> : <LoggedOut />}</div>;
};

export default App;

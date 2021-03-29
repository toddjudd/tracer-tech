import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import './App.css';

import auth from './firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user] = useAuthState(auth);
  return <div className='App'>{user ? <LoggedIn /> : <LoggedOut />}</div>;
};

export default App;

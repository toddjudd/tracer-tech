import logo from './Tracer.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp(process.env.REACT_APP_FIREBASE_CONFIG);

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <SignOut />
      </header>
      <section>{user ? <Welcome /> : <SignIn />}</section>
    </div>
  );
};

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </>
  );
};

const SignOut = () => {
  return (
    auth.currentUser && (
      <button
        className='sign-out'
        onClick={() => {
          auth.signOut();
        }}></button>
    )
  );
};

const Welcome = () => {
  <h1>Welcome {auth.currentUser.displayName}</h1>;
};

export default App;

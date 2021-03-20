import logo from './Tracer.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Button } from 'react-bootstrap';

import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

firebase.initializeApp({
  apiKey: 'AIzaSyBRcMvWr5ebXGpYzrvKeqFg2Ua1EKKgiP0',
  authDomain: 'tracer-tech.firebaseapp.com',
  databaseURL: 'https://tracer-tech-default-rtdb.firebaseio.com',
  projectId: 'tracer-tech',
  storageBucket: 'tracer-tech.appspot.com',
  messagingSenderId: '554765066642',
  appId: '1:554765066642:web:66f145f9193b5f4806214b',
});

const auth = firebase.auth();
// const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className='App'>
      <header className='App-header'>
        <SignOut />
      </header>
      <section className='App-section'>
        {user ? <Welcome /> : <SignIn />}
      </section>
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
      <img src={logo} className='App-logo-main' alt='logo' />
      <Button className='sign-in' onClick={signInWithGoogle}>
        Sign In With Google <FontAwesomeIcon icon={faGoogle} />
      </Button>
    </>
  );
};

const SignOut = () => {
  return (
    auth.currentUser && (
      <>
        <img src={logo} className='App-logo-icon' alt='logo' />
        <Button
          className='sign-out'
          onClick={() => {
            auth.signOut();
          }}>
          Sign Out
        </Button>
      </>
    )
  );
};

const Welcome = () => {
  console.log(auth.currentUser.getIdToken(true));
  return (
    <>
      <h1>Welcome {auth.currentUser.displayName}</h1>
    </>
  );
};

export default App;

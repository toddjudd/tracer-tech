import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';

import logo from '@/assets/Tracer.svg';

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

export const Landing = () => {
  const [user] = useAuthState(auth);

  return (
    <div className='bg-[#2c2e35] min-h-screen text-white caret-transparent grid grid-rows-[auto_1fr] justify-items-stretch'>
      <header className='grid grid-cols-[auto_1fr_auto] items-center p-3 bg-[#202224]'>
        <SignOut />
      </header>
      <section>{user ? <Welcome /> : <SignIn />}</section>
    </div>
  );
};

export const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <img src={logo} className='h-[40vmin] pointer-events-auto' alt='logo' />
      <Button className='sign-in' onClick={signInWithGoogle}>
        Sign In With Google <FontAwesomeIcon icon={faGoogle as IconProp} />
      </Button>
    </>
  );
};

export const SignOut = () => {
  return (
    auth.currentUser && (
      <>
        <img src={logo} className='h-[10vmin] pointer-events-none' alt='logo' />
        <Button
          className='col-start-3'
          onClick={() => {
            auth.signOut();
          }}>
          Sign Out
        </Button>
      </>
    )
  );
};

export const Welcome = () => {
  console.log(auth?.currentUser?.getIdToken(true));
  return (
    <>
      <h1>Welcome {auth?.currentUser?.displayName}</h1>
    </>
  );
};

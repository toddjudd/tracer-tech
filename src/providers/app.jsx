import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import { FirebaseAuthProvider } from '../lib/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyBRcMvWr5ebXGpYzrvKeqFg2Ua1EKKgiP0',
  authDomain: 'tracer-tech.firebaseapp.com',
  databaseURL: 'https://tracer-tech-default-rtdb.firebaseio.com',
  projectId: 'tracer-tech',
  storageBucket: 'tracer-tech.appspot.com',
  messagingSenderId: '554765066642',
  appId: '1:554765066642:web:66f145f9193b5f4806214b',
});

export const AppProvider = ({ children }) => {
  return (
    <FirebaseAuthProvider>
      <Router>{children}</Router>
    </FirebaseAuthProvider>
  );
};

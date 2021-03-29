import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export default auth;

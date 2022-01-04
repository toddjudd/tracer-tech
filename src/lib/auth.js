import firebase from 'firebase/app';
import 'firebase/auth';
import { createContext, useEffect, useState, useContext } from 'react';

const FirebaseAuthContext = createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const value = { ...user, auth };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser({ user, auth });
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider'
    );
  }
  return context;
};

export { FirebaseAuthProvider, useFirebaseAuth };

// import { useAuthState } from 'react-firebase-hooks/auth';

// firebase.initializeApp({
//   apiKey: 'AIzaSyBRcMvWr5ebXGpYzrvKeqFg2Ua1EKKgiP0',
//   authDomain: 'tracer-tech.firebaseapp.com',
//   databaseURL: 'https://tracer-tech-default-rtdb.firebaseio.com',
//   projectId: 'tracer-tech',
//   storageBucket: 'tracer-tech.appspot.com',
//   messagingSenderId: '554765066642',
//   appId: '1:554765066642:web:66f145f9193b5f4806214b',
// });

// const auth = firebase.auth();

// const [user] = useAuthState(auth);

// export {authProvider, useAuthState}
// //old comnponenets

// const App = () => {
//   const [user] = useAuthState(auth);

//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <SignOut />
//       </header>
//       <section className='App-section'>
//         {user ? <Welcome /> : <SignIn />}
//       </section>
//     </div>
//   );
// };

// const SignIn = () => {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };
//   return (
//     <>
//       <img src={logo} className='App-logo-main' alt='logo' />
//       <Button className='sign-in' onClick={signInWithGoogle}>
//         Sign In With Google <FontAwesomeIcon icon={faGoogle} />
//       </Button>
//     </>
//   );
// };

// const SignOut = () => {
//   return (
//     auth.currentUser && (
//       <>
//         <img src={logo} className='App-logo-icon' alt='logo' />
//         <Button
//           className='sign-out'
//           onClick={() => {
//             auth.signOut();
//           }}>
//           Sign Out
//         </Button>
//       </>
//     )
//   );
// };

// const Welcome = () => {
//   console.log(auth.currentUser.getIdToken(true));
//   return (
//     <>
//       <h1>Welcome {auth.currentUser.displayName}</h1>
//     </>
//   );
// };

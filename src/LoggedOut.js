import logo from './Tracer.svg';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import firebase from 'firebase';
import auth from './firebase';

const LoggedOut = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div className='LoggedOut'>
      {/* logo */}
      <img src={logo} className='App-logo-main' alt='logo' />
      {/* scope request */}
      {/* requesting app? */}
      {/* login with google */}
      <Button className='sign-in' onClick={signInWithGoogle}>
        Sign In With Google <FontAwesomeIcon icon={faGoogle} />
      </Button>
    </div>
  );
};

export default LoggedOut;

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFirebaseAuth } from '../../../lib/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export const LoginForm = () => {
  const { user, auth } = useFirebaseAuth();
  const signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => navigate('/app/profile'));
  };

  const navigate = useNavigate();

  if (user) {
    navigate('/app/profile');
    return <h1>what the hell</h1>;
  }
  return (
    <Button className='login' onClick={signInWithGoogle}>
      Sign In With Google <FontAwesomeIcon icon={faGoogle} />
    </Button>
  );
};

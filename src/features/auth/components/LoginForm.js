import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFirebaseAuth } from '../../../lib/auth';

export const LoginForm = () => {
  const { user, auth } = useFirebaseAuth();
  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button className='sign-in' onClick={signInWithGoogle}>
      Sign In With Google <FontAwesomeIcon icon={faGoogle} />
    </Button>
  );
};

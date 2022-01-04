import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useFirebaseAuth } from '../../../lib/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export const LogoutButton = () => {
  const { user, auth } = useFirebaseAuth();
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate('/');
  };

  if (!user) return null;
  return (
    <Button className='logout' onClick={signOut}>
      Log Out
    </Button>
  );
};

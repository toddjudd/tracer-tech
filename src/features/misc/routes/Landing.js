import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { useFirebaseAuth } from '../../../lib/auth';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useFirebaseAuth();

  const handleStart = () => {
    if (user) {
      navigate('/app/profile');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <h1>Welcome to tracer tech</h1>
      <Button onClick={handleStart}>Get started</Button>
    </>
  );
};

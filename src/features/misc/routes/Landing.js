import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = { user: null };
  // const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/app');
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

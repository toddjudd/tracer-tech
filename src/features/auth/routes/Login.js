import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return <LoginForm />;
};

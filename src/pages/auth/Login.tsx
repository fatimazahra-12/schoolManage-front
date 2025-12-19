/**
 * Login Page
 * Professional design with dark mode support
 */

import { LoginForm } from '../../components/forms/LoginForm.tsx';
import { AuthLayoutFull } from '../../common/AuthLayoutFull';

export const Login = () => {
  return (
    <AuthLayoutFull title="Connexion" subtitle="Accédez à votre espace SmartCampus">
      <LoginForm />
    </AuthLayoutFull>
  );
};

export default Login;

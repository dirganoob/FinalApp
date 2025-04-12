import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: '',
    username: '',
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (loginObj.username.trim() === '') {
      setLoading(false);
      return setErrorMessage('Username is required!');
    }
    if (loginObj.password.trim() === '') {
      setLoading(false);
      return setErrorMessage('Password is required!');
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginObj.username,
          password: loginObj.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('access_token', data.access_token);
        navigate('/app/dashboard');
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
          {/* Left Section */}
          <div className="hidden md:flex items-center justify-center bg-blue-500 p-8 text-white">
            <LandingIntro />
          </div>

          {/* Right Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Welcome Back!</h2>
            <form onSubmit={submitForm} className="space-y-6">
              {/* Username Input */}
              <InputText
                type="text"
                defaultValue={loginObj.username}
                updateType="username"
                containerStyle="mt-4"
                labelTitle="Username"
                updateFormValue={updateFormValue}
              />

              {/* Password Input */}
              <InputText
                defaultValue={loginObj.password}
                type="password"
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {errorMessage && <ErrorText styleClass="mt-4 text-red-500">{errorMessage}</ErrorText>}

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn w-full btn-primary text-white font-bold ${
                  loading ? 'loading' : ''
                }`}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-sm">
                Don't have an account yet?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

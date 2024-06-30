import React from 'react';
import { Link } from 'react-router-dom'; 
import OrganizationLogin from './OrganizationLogin';
import MemberLogin from './MemberLogin';
import ToggleSwitch from '../ToggleSwith';
import NavigationBar from '../Homepage/Navigationbar';

const Login = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login Page</h1>
      <div className="max-w-md mx-auto">
        
        <ToggleSwitch
          component1={<OrganizationLogin />}
          component2={<MemberLogin />}
        />
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

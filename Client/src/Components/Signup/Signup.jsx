import React, { useState} from 'react';;
import { Link } from 'react-router-dom'; 
import OrganizationSignup from './OrganizationSignup';
import MemberSignup from './MemberSignup';      
import ToggleSwitch from '../ToggleSwith';

const Signup = () => {

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Signup Page</h1>
      <ToggleSwitch
      
        component1={<OrganizationSignup />}
        component2={<MemberSignup/>}
      />
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
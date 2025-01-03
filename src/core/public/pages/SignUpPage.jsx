import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
      alert("Passwords don't match");
      return;
    }

    try{
      // console.log({email, password});
      const response = await axios.post("http://localhost:5000/api/user/", {
        email, 
        password
      });

      if (response.status===200 || response.status===201) {
        toast.success('Registration success')
        navigate("/login")
      }else{
        toast.error('Registration failed');
      }
    }catch(e){
      toast.error('Registration failed.');
  }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url('src/assets/images/loginSignupBg.png')` }}>
      {/* Transparent Box */}
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="src\assets\images\WorldReaderLogo.png" alt="World Reader Logo" className="w-32 h-32" />
          </div>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              />
            </div>
            <div>
              <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">Repeat Password</label>
              <input 
              type="password" 
              id="repeat-password" 
              name="repeat-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
              />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Bottom White Box */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center space-x-4 mt-2">
          <p className="text-gray-700">Log in with</p>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <img src="src/assets/images/flat-color-icons_google.png" alt="google" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <img src="src/assets/images/logos_facebook.png" alt="facebook" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <img src="src/assets/images/ant-design_github-filled.png" alt="github" />
            </a>
          </div>
          <p className="mt-4 text-gray-600">
            Already registered? <a href="/login" className="text-blue-600 hover:text-blue-500"> Log in </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
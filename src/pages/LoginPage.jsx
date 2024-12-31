import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md mx-auto overflow-hidden bg-white shadow-xl rounded-lg">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('path-to-your-background-image.jpg')` }}></div>
        <div className="relative px-6 py-8 sm:px-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="src\assets\logo\WorldReaderLogo.png" alt="World Reader Logo" className="w-32 h-32" />
          </div>
          {/* Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700">Repeat Password</label>
              <input type="password" id="repeat-password" name="repeat-password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Log in with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Google</a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Facebook</a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">GitHub</a>
              </div>
            </div>
          </div>
          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <span className="mr-2">No account?</span>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;
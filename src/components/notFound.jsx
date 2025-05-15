import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-8xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Page not found
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-3 bg-black text-white rounded-md "
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default NotFound;

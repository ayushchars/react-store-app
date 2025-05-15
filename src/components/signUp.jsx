import React, { useState, useEffect } from 'react';
import { dummyUsers as initialDummyUsers } from '../utils/users';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [userDetail, setUserDetail] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('dummyUsers');
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(initialDummyUsers);
      localStorage.setItem('dummyUsers', JSON.stringify(initialDummyUsers));
    }
  }, []);

  const handleChange = (e) => {
    setUserDetail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailExists = users.some(user => user.email === userDetail.email);
    if (emailExists) {
      toast.error("A user with this email already exists!");
      return;
    }

    const newUser = {
      id: users.length + 1,
      ...userDetail
    };
    toast.success("User created successfully");
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('dummyUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify({ name : userDetail?.name, email :  userDetail?.email }));
    navigate("/")

    setUserDetail({ name: '', email: '', password: '' }); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              required
              value={userDetail.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={userDetail.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={userDetail.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4" onClick={()=>navigate("/login")}>
          Already have an account?{' '}
          <span className="text-black font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

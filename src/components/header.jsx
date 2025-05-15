import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';


function Header() {
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);



  const handleLogout =()=>{
    localStorage.removeItem('user');
    setUser(null); 
    toast.success("User logged out successfully")

  }
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">

      <Link to="/" className="text-2xl font-extrabold text-black">
        My Store
      </Link>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Link to="/cart" className="text-gray-700 hover:text-gray-800">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white rounded-full text-xs px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
            <button
              className="bg-black text-white px-3 py-1 rounded "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white px-3 py-1 rounded "
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

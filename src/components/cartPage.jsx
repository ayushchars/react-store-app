import React from 'react';
import { useCart } from '../context/cartContext';
import { IoTrashBinSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate()

  const handleComform = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      toast.success("Order placed successfully");
      navigate("/conform");
    } else {
      toast.error("Please log in before placing an order");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Shopping Bag</h2>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-contain bg-gray-100 rounded"
              />
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Size: L</p>
                <h2 className="text-lg font-semibold">Price : {item.price}</h2>

              </div>
              <div className="flex items-center gap-3">
                <IoTrashBinSharp
                  onClick={() => removeFromCart(item)}
                  className=" cursor-pointer text-xl hover:text-red-800"
                  title="Remove Item"
                />

                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, 'set', parseInt(e.target.value))}
                  className="border px-3 py-1 rounded"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded shadow-sm border self-start">
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4">Order Summary</h4>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          onClick={handleComform}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartPage;

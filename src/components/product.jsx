import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import useLazyLoad from '../utils/loading';
import SkeletonCard from "./skeletonCard"
function Product() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setAllProducts(response.data);
        setProducts(response.data.slice(0, count));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadProducts = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextCount = count + 4;
      setProducts(allProducts.slice(0, nextCount));
      setCount(nextCount);
      setIsLoading(false);
    }, 500); 
  };

  useLazyLoad({
    allItems: allProducts,
    count,
    setCount,
    loadItems: loadProducts,
  });

  const handleAddToCart = (product) => {
    const formattedProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    };
    addToCart(formattedProduct);
  };
 

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(loading || products.length === 0)
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
          : products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="p-5">
                  <img
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="object-contain h-40 mx-auto"
                  />
                </div>
                <div className="px-5 pb-5 text-left">
                  <h5 className="text-md font-semibold tracking-tight text-gray-900 line-clamp-2 min-h-[3rem]">
                    {product.title}
                  </h5>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-700">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-white bg-black hover:bg-gray-700 font-medium rounded text-sm px-5 py-2.5 text-center cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

        {!loading &&
          isLoading &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`lazy-skeleton-${i}`} />)}
      </div>
    </section>
  );
}

export default Product;

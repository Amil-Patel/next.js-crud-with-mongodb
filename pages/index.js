import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

const index = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const res = await axios.get('http://localhost:3000/api/auth/routes');
              console.log(res.data.product);
              setProducts(res.data.products); 
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };

      fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/${productId}`);
      
      setProducts(products.filter(product => product._id !== productId));
  } catch (error) {
      console.error('Error deleting product:', error);
  }
  };
  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
      
  );

  return (
      <div className='user'>
      <Link className="add_btn" href={"/add"}>Add New Product</Link>
      <h1>All Products</h1>
      <input 
          type="text" 
          placeholder="Search product" 
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
      />
      {filteredProducts.length > 0 ? (
          <table border={1} cellPadding={10} cellSpacing={0}>
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredProducts.map((product, index) => (
                      <tr key={product._id}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td className='btn'>
                              <button onClick={() => handleDelete(product._id)}>
                                  <i className="fa-solid fa-trash"></i>
                              </button>
                              <Link href={`/edit/${product._id}`}>
                                  <i className="fa-regular fa-pen-to-square"></i>
                              </Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      ) : (
          <p className="no-records-msg">No records found.</p>
      )}
  </div>
);
};

export default index;

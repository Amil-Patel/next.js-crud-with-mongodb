// pages/edit.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(id)
        const res = await axios.get(`http://localhost:3000/api/auth/${id}`);
        console.log(res.data)
        setProduct({
          ...res.data
        })
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const submitForm = async (e) => {
    e.preventDefault();
   
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
    };
    

    try {
      await axios.patch(`http://localhost:3000/api/auth/${id}`, data);
        router.push('/');
    } catch (error) {
      console.error('Error updating product:', error);
     
    }
  };

  return (
    <div className='form'>
      <Link href="/">Back</Link>
      <h2>Edit Product</h2>
      <form className='data' onSubmit={submitForm}>
        <div className="inputdata">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={inputHandler}
            placeholder="Name"
            name="name"
            value={product.name}
            required
            autoComplete='off'
          />
        </div>
        <div className="inputdata">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            onChange={inputHandler}
            placeholder="Description"
            name="description"
            value={product.description}
            required
            autoComplete='off'
          />
        </div>
        <div className="inputdata">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            onChange={inputHandler}
            placeholder="Price"
            name="price"
            value={product.price}
            required
            autoComplete='off'
          />
        </div>
    
        <div className="inputdata">
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

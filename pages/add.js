import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const add = () => {
    const initialUseState = {
        name: "",
        description: "",
        price: "",
        image: null
      };
      
      const [user, setUser] = useState(initialUseState);
      const [formValid, setFormValid] = useState(false);
    
      const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        checkFormValidity();
      };
    
      const imageHandler = (e) => {
        setUser({ ...user, image: e.target.files[0] });
        checkFormValidity();
      };
      const checkFormValidity = () => {
       
        if (user.name.trim() !== '' && user.description.trim() !== '' && user.price.trim() !== '' && user.image) {
          setFormValid(true);
        } else {
          setFormValid(false);
        }
      };
      const submitForm = async (e) => {
        e.preventDefault();
       
        const data = {
          name: user.name,
          description: user.description,
          price: user.price,
        }
    
        try {
          const response = await axios.post('http://localhost:3000/api/auth/routes', data);
          navigate("/");
          console.log(response.data);
        } catch (error) {
          console.error("Error adding product:", error);
        }
      };
    
      return (
        <div className='form'>
          <Link href={"/"}>Back</Link>
          <h2>Add New Product</h2>
          <form className='data' onSubmit={submitForm}>
            <div className="inputdata">
              <label htmlFor="name">Name</label>
              <input type="text" onChange={inputHandler} placeholder="Name" name="name"  autoComplete='off' />
            </div>
            <div className="inputdata">
              <label htmlFor="description">Description</label>
              <input type="text" onChange={inputHandler} placeholder="Description" name="description"  autoComplete='off' />
            </div>
            <div className="inputdata">
              <label htmlFor="price">Price</label>
              <input type="text" onChange={inputHandler} placeholder="Price" name="price"  autoComplete='off' />
            </div>
            <div className="inputdata">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      );
}

export default add

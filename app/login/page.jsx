"use client"
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
        title: "Please Wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    // Validation for email
    if (formData.email.trim() === '') {
      Swal.fire({
        title: "Oops!",
        text: "Please enter your email",
        icon: "error"
      });
      return;
    }
  
    // Validation for password
    if (formData.password.trim() === '') {
      Swal.fire({
        title: "Oops!",
        text: "Please enter your password",
        icon: "error"
      });
      return;
    }
  
    // Call API to authenticate user
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json(); // Await the response.json()
      console.log(data);
      if (data.status == 200) {
        // Check if the response was successful (status code 200-299)
        // Login successful, handle accordingly
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success"
        });
        // Redirect to dashboard or perform other actions upon successful login
      } else {
        // Login failed, handle accordingly
        Swal.fire({
          title: "Oops!",
          text: data.message || 'An error occurred. Please try again later.',
          icon: "error"
        });
      }
    } catch (error) {
      // Catch and handle any errors that occur during the fetch request
      console.error('Error logging in:', error);
      Swal.fire({
        title: "Oops!",
        text: "An error occurred. Please try again later.",
        icon: "error"
      });
    }
  };
  

  return (
    <div className="container text-black w-screen h-screen justify-center flex content-center items-center bg-white">
      <form onSubmit={handleSubmit} className="flex p-10 rounded-md shadow-md border w-96 flex-col gap-4">
        <h2 className='text-black text-3xl font-semibold'>Login</h2>
        <div>
          <div className="mb-2 w-full block">
            <label htmlFor="email">Email</label>
          </div>
          <input
            className="border rounded-md w-full text-black py-0.5 px-2"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 w-full block">
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="border rounded-md w-full text-black py-0.5 px-2"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="border bg-green-400 rounded-md shadow-sm py-1 mt-5 text-white font-bold">
          Login
        </button>
      </form>
    </div>
  );
}

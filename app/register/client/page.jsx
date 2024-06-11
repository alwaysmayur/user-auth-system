"use client"
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Component() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
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
    // Validation for first name
    if (formData.fname.trim() === '') {
      Swal.fire({
        title: "Oops!",
        text: "Please enter your first name",
        icon: "error"
      });
      return;
    }

    // Validation for last name
    if (formData.lname.trim() === '') {
      Swal.fire({
        title: "Oops!",
        text: "Please enter your last name",
        icon: "error"
      });
      return;
    }

    // Perform email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "Oops!",
        text: "Invalid email address",
        icon: "error"
      });
      return;
    }

    // Perform password validation
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Oops!",
        text: "Passwords don't match",
        icon: "error"
      });
      return;
    }

    // Call API to register user
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json(); // Await the response.json()
      if (data.status == 201) {
        // Check if the response was successful (status code 200-299)
        // Registration successful, handle accordingly
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success"
        });
      } else {
        // Registration failed, handle accordingly
        Swal.fire({
          title: "Oops!",
          text: data.message || 'An error occurred. Please try again later.',
          icon: "error"
        });
      }
    } catch (error) {
      // Catch and handle any errors that occur during the fetch request
      console.error('Error registering user:', error);
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
        <h2 className='text-black text-3xl font-semibold'>Client Registration</h2>
        <div>
          <div className="mb-2 w-full block">
            <label htmlFor="fname">First Name</label>
          </div>
          <input
            className="border rounded-md w-full text-black py-0.5 px-2"
            id="fname"
            type="text"
            value={formData.fname}
            onChange={handleChange}

          />
        </div>
        <div>
          <div className="mb-2 w-full block">
            <label htmlFor="lname">Last Name</label>
          </div>
          <input
            className="border rounded-md w-full text-black py-0.5 px-2"
            id="lname"
            type="text"
            value={formData.lname}
            onChange={handleChange}

          />
        </div>
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
        <div>
          <div className="mb-2 w-full block">
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <input
            className="border rounded-md w-full text-black py-0.5 px-2"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}

          />
        </div>
        <button type="submit" className="border bg-green-400 rounded-md shadow-sm py-1 text-white font-bold">
          Submit
        </button>
        <a href="/login" className="text-blue-500 ">
          Do have creadential Login ?
        </a>
      </form>
    </div>
  );
}

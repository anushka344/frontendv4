import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ui.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "",phone:"786876", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:7240/api/Users/Register", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(user),

    })

      .then((res) => {

        console.log(res);

        if (!res.ok) {

          // Check for error status

          throw new Error("Registration failed");

        }

        return res.json();

      })

      .then((data) => {

        if (data.message === "New Employer registered") {

          window.location.href="http://localhost:3000/login";

        } else {

          toast.error("registration failed");

        }

      })

      .catch((error) => {

        console.log(error);

        window.alert("Registration failed. Please try again.");

      });
  };
  
  
  return (
    <div className="container login-container">
      <div className="login-form login-main-div">
      <div className="login-inner-div">
      <h2 className="loginHead">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group  login-email">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group login-email">
          <label htmlFor="userEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPassword login-pass">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary login-button">
          Register
        </button>
        <p className="mt-2 checker-acc">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      </div>
    </div>
    <div className="signupImage"></div>
    <ToastContainer/>
    </div>
  );
};

export default Register;

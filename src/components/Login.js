import React, { useState } from "react";
import {  Link } from "react-router-dom";
import './ui.css'; 


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace with your API endpoint for user authentication
    fetch("https://localhost:7240/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log(data.token);
        // Save the token in local storage
        localStorage.setItem("token",data.token);
        window.alert("Login successful!");
      //  window.location.reload();
        // Redirect to /units
      window.location.href = "http://localhost:3000/homePage";
    
      })
      .catch((error) => {
        console.log(error);
        window.alert("Login failed. Please try again.");
        

        //window.location.reload();
        // Reload the page
      });
  };

  return (
    <div className="container login-container">
      <div className="login-form login-main-div">
      <div className="login-inner-div">
      <h2 className="loginHead">Login</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group login-email">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group login-pass">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit " className="btn btn-primary login-button">
          Login
        </button>
        <p className="mt-2 checker-acc">
          Don't have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
    </div>
    <div className="login-image "></div>
    </div>
  );
};

export default Login;

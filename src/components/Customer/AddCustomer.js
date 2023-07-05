import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './customer.css'; // Assuming you have a CSS file named "customer.css"

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    state: "",
  });
 const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Customer added successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
      window.location.href= "http://localhost:3000/Customer";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title addcustomerhead">Add Customer</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={customer.phoneNumber}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={customer.state}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginRight: "15px" }}>
              Submit
            </button>
            <Link to="/customer" className="btn btn-secondary ml-2">
              Back
            </Link>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;

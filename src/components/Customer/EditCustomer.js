import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { customerId } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    state: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customerId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Customer/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Customer data updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="customerAddress"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerPhoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="customerPhoneNumber"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerState">State</label>
          <input
            type="text"
            className="form-control"
            id="customerState"
            name="state"
            value={customer.state}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Update
        </button>
        <Link to="/customer" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default EditCustomer;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    state: "",
    countryId: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    // Check if the countryId exists in the Country table
    fetch(`https://localhost:7240/api/Country/${supplier.countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // CountryId exists, proceed with adding the supplier
          fetch("https://localhost:7240/api/Supplier", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
            body: JSON.stringify(supplier),
          })
            .then((res) => res.json())
            .then((data) => {
              window.alert("Supplier added successfully!");
            })
            .catch((error) => {
              console.log(error);
              
            });
        } else {
          // CountryId does not exist
          setErrorMessage(`CountryId ${supplier.countryId} does not exist.`);
          window.alert("CountryId  does not exist");
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("CountryId  does not exist");
      });
  };

  return (
    <div className="container">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={supplier.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={supplier.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={supplier.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={supplier.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryId">Country ID</label>
          <input
            type="text"
            className="form-control"
            id="countryId"
            name="countryId"
            value={supplier.countryId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/suppliers" className="btn btn-secondary ml-2">
          Back
        </Link>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddSupplier;

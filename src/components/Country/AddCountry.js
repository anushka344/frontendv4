import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCountry = () => {
  const [country, setCountry] = useState({ countryName: "", countryCode: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCountry((prevCountry) => ({ ...prevCountry, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(country),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized"); // Handle unauthorized access error
        } else {
          throw new Error("Error occurred"); // Handle other errors
        }
      })
      .then((data) => {
        window.alert("Country added successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Add Country</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="countryName">Country Name</label>
          <input
            type="text"
            className="form-control"
            id="countryName"
            name="countryName"
            value={country.countryName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCode">Country Code</label>
          <input
            type="text"
            className="form-control"
            id="countryCode"
            name="countryCode"
            value={country.countryCode}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <Link to="/country" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default AddCountry;

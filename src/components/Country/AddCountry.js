import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './country.css';

const AddCountry = () => {
  const [country, setCountry] = useState({ countryName: "", countryCode: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCountry((prevCountry) => ({ ...prevCountry, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    fetch("https://localhost:7240/api/Country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(country),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
        } else {
          throw new Error("Error occurred");
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
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title addcountryhead">Add Country</h2>
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
                style={{ marginBottom: '20px' }}
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
                style={{ marginBottom: '20px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '15px' }}>
              Submit
            </button>
            <Link to="/country" className="btn btn-secondary">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCountry;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditCountry = () => {
  const { countryId } = useParams();

  const [country, setCountry] = useState({
    countryName: "",
    countryCode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Country/${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCountry((prevCountry) => ({ ...prevCountry, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Country/${countryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(country),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Data updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Edit Country</h2>
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
          Update
        </button>
        <Link to="/countries" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default EditCountry;

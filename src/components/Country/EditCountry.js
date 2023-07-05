import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './country.css';

const EditCountry = () => {
  const { countryId } = useParams();

  const [country, setCountry] = useState({
    countryName: "",
    countryCode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Country/${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Country/${countryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      window.location.href= "http://localhost:3000/Country";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title editcountryhead">Edit Country</h2>
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
              Update
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

export default EditCountry;

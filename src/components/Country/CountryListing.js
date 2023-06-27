import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './country.css';

const CountryListing = () => {
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Country", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
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
        setCountryData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage

      fetch(`https://localhost:7240/api/Country/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      })
        .then((res) => {
          if (res.ok) {
            alert('Removed successfully.');
            setCountryData(countryData.filter(country => country.id !== id));
          } else if (res.status === 401) {
            throw new Error("Unauthorized"); // Handle unauthorized access error
          } else {
            throw new Error('Error deleting country');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="content-container">
      <h2 className="Countryhead">Country Listing</h2>
      <Link to="/countries/add" className="add-country">
        Add Country
      </Link>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr className="txt-tr">
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {countryData.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.countryName}</td>
              <td>{country.countryCode}</td>
              <td>
                <Link to={`/countries/edit/${country.id}`} className="btn btn-primary btn-sm mr-2" style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(country.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryListing;

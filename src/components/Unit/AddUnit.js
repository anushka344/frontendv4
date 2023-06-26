import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUnit = () => {
  const [unit, setUnit] = useState({ name: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnit((prevUnit) => ({ ...prevUnit, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Unit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(unit),
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
        window.alert("Unit added successfully!"); // Show alert when unit is added successfully
      })
      .catch((error) => {
        console.log(error);
        // Handle and display error to the user
       // window.alert("Error occurred while adding unit.");
      });
  };

  return (
    <div className="container">
      <h2>Add Unit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="unitName">Unit Name</label>
          <input
            type="text"
            className="form-control"
            id="unitName"
            name="name"
            value={unit.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitDesc">Unit Description</label>
          <input
            type="text"
            className="form-control"
            id="unitDesc"
            name="description"
            value={unit.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <Link to="/units" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default AddUnit;

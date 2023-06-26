import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditUnit = () => {
  const { unitId } = useParams();

  const [unit, setUnit] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    console.log({unitId});
    fetch(`https://localhost:7240/api/Unit/${unitId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnit(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [unitId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnit((prevUnit) => ({ ...prevUnit, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Unit/${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(unit),
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
      <h2>Edit Unit</h2>
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
          Update
        </button>
        <Link to="/units" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default EditUnit;

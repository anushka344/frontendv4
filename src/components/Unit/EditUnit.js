import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Unit.css'; // Import custom CSS file for styling

const EditUnit = () => {
  const { unitId } = useParams();

  const [unit, setUnit] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

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

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

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
      window.location.href= "http://localhost:3000/units";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title addunithead">Edit Unit</h2>
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
                style={{ marginBottom: "20px" }}
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
                style={{ marginBottom: "20px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginRight: "15px" }}>
              Update
            </button>
            <Link to="/units" className="btn btn-secondary">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUnit;

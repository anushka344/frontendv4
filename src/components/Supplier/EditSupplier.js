import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditSupplier = () => {
  const { supplierId } = useParams();

  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Supplier/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSupplier(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [supplierId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    fetch(`https://localhost:7240/api/Supplier/${supplierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(supplier),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Supplier data updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2>Edit Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="supplierName">Name</label>
          <input
            type="text"
            className="form-control"
            id="supplierName"
            name="name"
            value={supplier.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplierAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="supplierAddress"
            name="address"
            value={supplier.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplierPhoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="supplierPhoneNumber"
            name="phoneNumber"
            value={supplier.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Update
        </button>
        <Link to="/suppliers" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default EditSupplier;

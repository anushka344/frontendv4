import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './supplier.css';

const EditSupplier = () => {
  const { supplierId } = useParams();

  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Supplier/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Supplier/${supplierId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body"> 
          <h2 className="card-title editsupplierhead">Edit Supplier</h2>
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
                style={{ marginBottom: '20px' }}
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
                style={{ marginBottom: '20px' }}
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
                style={{ marginBottom: '20px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2"style={{ marginRight: "15px" }}>
              Update
            </button>
            <Link to="/suppliers" className="btn btn-secondary">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSupplier;

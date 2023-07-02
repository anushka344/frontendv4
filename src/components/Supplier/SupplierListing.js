import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './supplier.css';

const SupplierListing = () => {
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Supplier", {
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
        setSupplierData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage

      fetch(`https://localhost:7240/api/Supplier/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      })
        .then((res) => {
          if (res.ok) {
            alert('Removed successfully.');
            setSupplierData(supplierData.filter(supplier => supplier.id !== id));
          } else if (res.status === 401) {
            throw new Error("Unauthorized"); // Handle unauthorized access error
          } else {
            throw new Error('Error deleting supplier');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="content-container" style={{ padding: '40px' }}>
      <h2 className="Supplierhead">Supplier Listing</h2>
      <Link to="/supplier/add" className="btn add-supplier">
        Add Supplier
      </Link>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>State</th>
            <th>Country ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {supplierData.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.state}</td>
              <td>{supplier.countryId}</td>
              <td>
                <Link to={`/supplier/edit/${supplier.id}`} className="btn btn-primary btn-sm mr-2" style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supplier.id)}>
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

export default SupplierListing;

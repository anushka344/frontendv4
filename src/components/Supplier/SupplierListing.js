import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './supplier.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const deleteSupplier = (id, token) => {
    fetch(`https://localhost:7240/api/Supplier/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Removed successfully.");
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
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    toast.warn(
      <div>
        <p>Are you sure you want to remove?</p>
        <div className="confirmation-buttons">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteSupplier(id, token);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <span className="spacer"></span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
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
      <ToastContainer />
    </div>
  );
};

export default SupplierListing;


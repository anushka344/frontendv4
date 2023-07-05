import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './customer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerListing = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Customer", {
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
        setCustomerData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteCustomer = (id, token) => {
    fetch(`https://localhost:7240/api/Customer/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Removed successfully.");
          setCustomerData(customerData.filter(customer => customer.id !== id));
        } else if (res.status === 401) {
          throw new Error("Unauthorized"); // Handle unauthorized access error
        } else {
          throw new Error('Error deleting customer');
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
              deleteCustomer(id, token);
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
      <h2 className="Customerhead">Customer Listing</h2>
      <Link to="/customer/add" className="btn btn-primary add-customer">
        Add Customer
      </Link>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.state}</td>
              <td>
                <Link to={`/customer/edit/${customer.id}`} className="btn btn-primary btn-sm mr-2" style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(customer.id)}>
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

export default CustomerListing;

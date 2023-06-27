import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentListing = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Payment", {
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
        setPaymentData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage

      fetch(`https://localhost:7240/api/Payment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      })
        .then((res) => {
          if (res.ok) {
            alert('Removed successfully.');
            setPaymentData(paymentData.filter(payment => payment.id !== id));
          } else if (res.status === 401) {
            throw new Error("Unauthorized"); // Handle unauthorized access error
          } else {
            throw new Error('Error deleting payment');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="content-container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Payment Listing</h2>
        <Link to="/payments/add" className="btn btn-primary">Add Payment</Link>
      </div>
      <table className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Payment Date</th>
            <th>Quantity</th>
            <th>Customer ID</th>
            <th>Product ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.qty}</td>
              <td>{payment.customerId}</td>
              <td>{payment.productId}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(payment.id)}>
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

export default PaymentListing;

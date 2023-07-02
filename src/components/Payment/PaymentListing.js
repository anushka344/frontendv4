import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css';

const PaymentListing = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [customerNames, setCustomerNames] = useState([]);
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('https://localhost:7240/api/Payment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error('Error occurred');
      }
    })
    .then((data) => {
      setPaymentData(data);
      const customerIds = data.map((payment) => payment.customerId);
      const productIds = data.map((payment) => payment.productId);
      fetchCustomerNames(customerIds);
      fetchProductNames(productIds);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const fetchCustomerNames = (customerIds) => {
    const token = localStorage.getItem('token');
    
    Promise.all(
      customerIds.map((customerId) =>
        fetch(`https://localhost:7240/api/Customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error fetching customer names');
          }
        })
        .then((customerData) => {
          const customerName = customerData.name;
          setCustomerNames((prevNames) => [...prevNames, { id: customerId, name: customerName }]);
        })
        .catch((error) => {
          console.log(error);
        })
      )
    );
  };

  const fetchProductNames = (productIds) => {
    const token = localStorage.getItem('token');
    
    Promise.all(
      productIds.map((productId) =>
        fetch(`https://localhost:7240/api/Product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error fetching product names');
          }
        })
        .then((productData) => {
          const productName = productData.name;
          setProductNames((prevNames) => [...prevNames, { id: productId, name: productName }]);
        })
        .catch((error) => {
          console.log(error);
        })
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');
      
      fetch(`https://localhost:7240/api/Payment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.ok) {
          alert('Removed successfully.');
          setPaymentData((prevData) => prevData.filter(payment => payment.id !== id));
        } else if (res.status === 401) {
          throw new Error("Unauthorized");
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
    <div className="content-container" style={{ padding: '40px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="Paymenthead">Payment Listing</h2>
        <Link to="/payments/add" className="btn btn-primary add-payment">Add Payment</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr>
            <th>ID</th>
            <th>Payment Date</th>
            <th>Quantity</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Product ID</th>
            <th>Product Name</th>
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
              <td>
                {customerNames.find((customer) => customer.id === payment.customerId)?.name}
              </td>
              <td>{payment.productId}</td>
              <td>
                {productNames.find((product) => product.id === payment.productId)?.name}
              </td>
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

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./History.css";
import Footer from "./Footer";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');

        if (sessionToken) {
            fetch('http://localhost:8080/order_history.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_token: sessionToken }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        setOrders(data.orders);
                        if (data.orders.length === 0) {
                            setError('No order history to show because you have not ordered anything yet. Please order something to see the status of your order');
                        }
                    } else {
                        setError(data.message);
                    }
                })
                .catch(error => {
                    setError('Error fetching order history.');
                    console.error('Error:', error);
                });
        } else {
            setError('No session token found.');
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1 className="order">Order History</h1>
                {error ? (
                    <div>{error}</div>
                ) : (
                    orders.length === 0 ? (
                        <div>No order history to show because you have not ordered anything yet.</div>
                    ) : (
                        orders.map(order => (
                            <div key={order.order_id} className="order-box">
                              <table>
                                <thead>
                                <tr>
                                <th>Order ID</th>
                                <th>Total Items</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                                <th>Order Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                <td>{order.order_id}</td>
                                <td>{order.total_items}</td>
                                <td>{order.total_price}</td>
                                <td>{order.order_date}</td>
                                <td>{order.order_status}</td>  
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                        ))
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default History;

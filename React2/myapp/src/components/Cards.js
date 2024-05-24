import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cardsdata from './CardsData';
import "./style.css";
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/action';

const Cards = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const send = (e) => {
        dispatch(ADD(e));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost/Medifast/products.php');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    return (
        <div className='container mt-3'>
            <h2 className='text-center'>Add to Cart Projects</h2>

            <div className="row d-flex justify-content-center align-items-center">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    data.map((element, id) => (
                        <Card key={id} style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                            <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className="mt-3" />
                            <Card.Body>
                                <Card.Title>{element.rname}</Card.Title>
                                <Card.Text>
                                    Price : ₹ {element.price}
                                </Card.Text>
                                <div className="button_div d-flex justify-content-center">
                                    <Button variant="primary" onClick={() => send(element)} className='col-lg-12'>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cards;

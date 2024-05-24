// CardsDetails.js

/*import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/action';

const CardsDetails = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getdata = useSelector((state) => state.cartreducer.carts);

    const compare = useCallback(() => {
        let comparedata = getdata.filter((e) => {
            return e.id === id;
        });
        setData(comparedata);
    }, [id, getdata]);

    useEffect(() => {
        compare();
    }, [compare]);

    const send = (e) => {
        dispatch(ADD(e));
    };

    const dlt = (id) => {
        dispatch(DLT(id));
        navigate.push("/");
    };

    const remove = (item) => {
        dispatch(REMOVE(item));
    };

    return (
        <>
            <div className="container mt-2">
                <h2 className='text-center'>Items Details Page</h2>
                <section className='container mt-3'>
                    <div className="iteamsdetails">
                        {data.map((ele) => (
                            <React.Fragment key={ele.id}>
                                <div className="items_img">
                                    <img src={ele.imgdata} alt="" />
                                </div>
                                <div className="details">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Restaurant</strong>  : {ele.rname}</p>
                                                    <p><strong>Price</strong>  : ₹{ele.price}</p>
                                                    <p><strong>Dishes</strong>  : {ele.address}</p>
                                                    <p><strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                        <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                                                        <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★	</span></p>
                                                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                                                    <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default CardsDetails;

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/action';
import Table from 'react-bootstrap/Table';
import Cardsdata from './CardsData';

const CardsDetails = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();
    const getdata = useSelector((state) => state.cartreducer.carts);

    const compare = useCallback(() => {
        let comparedata = Cardsdata.filter((e) => {
            return e.id.toString() === id;
        });
        setData(comparedata);
    }, [id]);

    useEffect(() => {
        compare();
    }, [compare]);

    const send = (e) => {
        dispatch(ADD(e));
    };

    const dlt = (id) => {
        dispatch(DLT(id));
        history("/");
    };

    const remove = (item) => {
        dispatch(REMOVE(item));
    };

    return (
        <>
            <div className="container mt-2">
                <h2 className='text-center'>Items Details Page</h2>
                <section className='container mt-3'>
                    <div className="iteamsdetails">
                        {data.map((ele) => (
                            <React.Fragment key={ele.id}>
                                <div className="items_img">
                                    <img src={ele.imgdata} alt="" />
                                </div>
                                <div className="details">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p><strong>Restaurant</strong>: {ele.rname}</p>
                                                    <p><strong>Price</strong>: ₹{ele.price}</p>
                                                    <p><strong>Dishes</strong>: {ele.address}</p>
                                                    <p><strong>Total</strong>: ₹{ele.price * ele.qnty}</p>
                                                    <p><strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                        <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                                                        <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p><strong>Rating</strong>: <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★</span></p>
                                                    <p><strong>Order Review</strong>: <span>{ele.somedata}</span></p>
                                                    <p><strong>Remove</strong>: <span><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default CardsDetails;*/
"use strict";
//# sourceMappingURL=CardsDetails.dev.js.map

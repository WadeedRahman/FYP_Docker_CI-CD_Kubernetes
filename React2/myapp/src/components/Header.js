import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/action';

const Header = () => {

    const [price, setPrice] = useState(0);

    const getdata = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    };

    useEffect(() => {
        const total = () => {
            let totalPrice = 0;
            getdata.forEach((ele) => {
                totalPrice += ele.price * ele.qnty;
            });
            setPrice(totalPrice);
        };
        total();
    }, [getdata]);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>

                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {getdata.length ?
                        <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getdata.map((e) => (
                                        <tr key={e.id}>
                                            <td>
                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                    <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                </NavLink>
                                            </td>
                                            <td>
                                                <p>{e.rname}</p>
                                                <p>Price : ₹{e.price}</p>
                                                <p>Quantity : {e.qnty}</p>
                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                    <i className='fas fa-trash smalltrash'></i>
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2" className="text-center">Total : ₹ {price}</td>
                                       
                                    </tr>
                                    <tr>
                                        
                                        <td colSpan="2" className="text-center"><NavLink to='/Checkout'>Checkout</NavLink></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div> :
                        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                            <i className='fas fa-close smallclose'
                                onClick={handleClose}
                                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                            <p style={{ fontSize: 22 }}>Your carts is empty</p>
                            <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                        </div>
                    }
                </Menu>
            </Navbar>
        </>
    )
}

export default Header;

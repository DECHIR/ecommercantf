// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useRef } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import {useReactToPrint} from "react-to-print";

function CheckoutForm() {
    
    // const stripe = useStripe();
    // const elements = useElements();
    const componentPDF=useRef();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();

    // //product 
    
    // const products = useSelector((state) => state.products);
    // const userCartObj = user.cart;
    // let cart = products.filter((product) => userCartObj[product._id] != null);

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [clientName, setClientName] = useState("");
    const [shopName, setShopName] = useState("");
    const [tel, setTel] = useState("");
    const [paying, setPaying] = useState(false);

    // const generatePDF= useReactToPrint({
    //     content: ()=>componentPDF.current,
    // });

    async function handlePay(e) {
        e.preventDefault();
        if (user.cart.count <= 0) return;
        setPaying(true);
        // const { client_secret } = await fetch("http://localhost:8080/create-payment", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer ",
        //     },
        //     body: JSON.stringify({ amount: user.cart.total }),
        // }).then((res) => res.json());
        // const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //     },
        // });
        console.log(tel);
            createOrder({ userId: user._id, cart: user.cart, address, country, clientName, shopName, tel }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Error`);
                    setTimeout(() => {
                        // navigate("/orders");
                        setPaying(false);
                    }, 3000);
                }
            });
        
    }

    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                <Row>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du Commercial</Form.Label>
                            <Form.Control type="text" placeholder="Nom du Commercial" value={user.name} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Addresse</Form.Label>
                            <Form.Control type="text" placeholder="Addresse" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Wilaya</Form.Label>
                            <Form.Control type="text" placeholder="Wilaya" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    {/* Nom du client */}
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom et Prenom Du Client</Form.Label>
                            <Form.Control type="text" placeholder="Nom et Prenom Du Client" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    {/* Nom du Magazin*/}
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom Du Magazin</Form.Label>
                            <Form.Control type="text" placeholder="Nom Du Magazin" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    {/* Telephone*/}
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Numero Du Tel</Form.Label>
                            <Form.Control type="text" placeholder="Numero Du Tel" value={tel} onChange={(e) => setTel(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
        <Button className="mt-3" type="submit" disabled={user.cart.count<=0 || paying || isSuccess}>
                    {paying ? "Processing..." : "Pay"}
                </Button>
                {/* <div ref={componentPDF}>
                <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>MATRICULE COMMERCIAL</th>
                    <th>NOM DU COMMERCIAL</th>
                    <th>EMAIL</th>
                    <th>NOM DU CLIENT</th>
                    <th>NOM DU MAGAZIN</th>
                    <th>ADRESSE</th>
                    <th>PRODUIT</th>
                    <th>QUANTITE</th>
                    <th>PRIX UNITAIRE</th>
                    <th>TOTALE</th>
                    
                </tr>
            </thead>
            <tbody>
                    <tr >
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{clientName}</td>
                        <td>{shopName}</td>
                        <td>{address}</td>
                        <td>{cart.name}</td>
                        <td>{cart.count}</td>
                        <td>{cart.total}</td>
                    </tr>
                
            </tbody>
        </Table>
                </div>
                <Button className="mt-3"  disabled={user.cart.count<=0 || paying || isSuccess} onClick={generatePDF}>
                    {paying ? "Bon de Commande..." : "Bon de Commande"}
                </Button> */}
            </Form>
        </Col>
    );
}

export default CheckoutForm;

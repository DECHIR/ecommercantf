import React, { useEffect, useState } from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsAdminPage from "../components/ClientsAdminPage";
import DashboardProducts from "../components/DashboardProducts";
import OrdersAdminPage from "../components/OrdersAdminPage";
import {useSelector} from "react-redux";
import CreditBalancePage from "../pages/CreditBalancePage";
import { Link } from "react-router-dom";
import axios from "../axios";
import {FcMoneyTransfer} from 'react-icons/fc';



function AdminDashboard() {
    
    const user = useSelector((state) => state.user);
    const [balance, setBalance] = useState(user.buy);
    const products = useSelector((state) => state.products);
    useEffect(()=>{
        setBalance(user.buy);
    },[]);
     return (
        <Container>
            <Tab.Container defaultActiveKey="products">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                        {user &&
            (<h5> <FcMoneyTransfer/> {balance} <FcMoneyTransfer/></h5>)}
                            <Nav.Item>
                                <Nav.Link eventKey="products">Produits</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Commandes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Commercants</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashboardProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersAdminPage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsAdminPage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;

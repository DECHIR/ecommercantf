import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";
import Pagination from "./Pagination";

function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    const [shipped, setShipped] = useState(false);
    const [refused, setRefused] = useState(false);
     

    const handleClose = () => setShow(false);

    function markShipped(orderId, ownerId) {
        setShipped(true);
        console.log(shipped);

        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }
    function markRefused(orderId, ownerId) {
        console.log(refused);
        setRefused(true);
        console.log(refused);


        axios
            .patch(`/orders/${orderId}/mark-refused`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }
    function showOrder(productsObj) {
        let productsToShow = products.filter((product) => productsObj[product._id]);
        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        console.log(productsToShow);
        setShow(true);
        setOrderToShow(productsToShow);
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then(({ data }) => {
                setLoading(false);
                setOrders(data);
            })
            .catch((e) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">Y'en a aucune Commande pour le Momment!</h1>;
    }

    function TableRow({ _id, count, owner, total, status, products, address,clientName, shopName, tel  }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}</td>
                <td>{count}</td>
                <td>{total}</td>
                <td>{address}</td>
                <td>{clientName}</td>
                <td>{shopName}</td>
                <td>{tel}</td>
                <td>
                    {status === "processing" ? (
                        <>
                        <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                            Accepter
                        </Button>
                        <Button size="sm" onClick={() => markRefused(_id, owner?._id)}>
                        Refuser
                    </Button>
                    </>
                    ) : (
                        <>
                         { status === "accepte" ? <Badge bg="success">Fait</Badge> : <Badge bg="danger">Refuse</Badge>}
                        </>
                    )}
                </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
                        Voir <i className="fa fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom du Commercial</th>
                        <th>Produit</th>
                        <th>Totale</th>
                        <th>Addresse</th>
                        <th>Nom du client</th>
                        <th>Nom du Magazin</th>
                        <th>Telephone</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={10} tablePagination={true} />
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order details</Modal.Title>
                </Modal.Header>
                {orderToShow.map((order) => (
                    <div className="order-details__container d-flex justify-content-around py-2">
                        <img src={order.pictures[0].url} style={{ maxWidth: 100, height: 100, objectFit: "cover" }} />
                        <p>
                            <span>{order.count} x </span> {order.name}
                        </p>
                        <p>Price: ${Number(order.price) * order.count}</p>
                    </div>
                ))}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrdersAdminPage;

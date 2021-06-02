import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection';
import './Live-parcel.css';

class parcelOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: "",
            size: "",
            Parcel: [],
            loading: true,
            showPopup: false,
            id: "",
        };

    }

    async componentDidMount() {
        const url = "http://localhost:8020/order/parcelorders";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ Parcel: data.orders, loading: false });
        this.searchArray = data;
    }
  
        render() {
            const url = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
    
            if (this.state.loading) {
                return (
                    <div>
                        <div className="logo">
                            <img height="100px" width="100px" src={url} />
                        </div>
                        <div className="state">loading...</div>
                    </div>
                );
            }

        return (
            <div>
                <Sidesection />
                <div>
                    <div className='link-set'>
                        <div className="details-set_data">
                            <Link to="/table-order" className="link-effect">
                                <div className="details-link">Table Order</div>
                            </Link>
                        </div>

                        <div className="details-set_datavalue">
                            <Link to="/table-order" className="link-effect">
                                <div className="details-linkvalue">Parcel Order</div>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <label className="cto">Parcel Order</label>
                        <div>
                            {this.state.Parcel.map(order => (
                                <div className="table-card">
                                    <div key={order._id}>
                                        <div className="table-order">
                                            <div className="table-total">Name : {order.name}</div>
                                            <div className="table-total">Order Status :- {order.OrderIs}</div>
                                            <div className="table-total">Date : {order.createdAt} </div>
                                        </div>

                                        <table className="order_table">
                                            <td>Image</td>
                                            <td>Name</td>
                                            <td>Quantity</td>
                                            <td>Price</td>
                                            <td>
                                                <div>Total(Rs) </div>
                                            </td>
                                        </table>

                                        <div>
                                            {order.items.map((suborder) =>
                                                <div key={suborder._id}>
                                                    <table className="orders_table1">
                                                        <tr>
                                                            <td>
                                                                <div classname="cart-images">
                                                                    <img height="100px" width="100px" src={suborder._id} />
                                                                </div>
                                                            </td>
                                                            <td>{suborder._id}</td>
                                                            <td>{suborder.qty} x</td>
                                                            <td>
                                                                <div className="table-Originaltotal"> {suborder.productPrice} ₹</div>
                                                            </td>
                                                            <td>
                                                                <div className="tables-total"> {suborder.total.toFixed(2)} ₹</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div>

                                                    </div>
                                                </div>)}
                                            <div className="All_orders-Total">
                                                <div className="orders-grandtotal"> Total : {order.grandTotal.toFixed(2)} ₹ </div>
                                            </div>

                                            <div className="payment-center">
                                                <button className="payment-btn">Payment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default parcelOrder;
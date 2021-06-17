import React, { Component } from "react";
import axios from "axios"; import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './items';
import Sidesection from './Sidesection';
import './Table-Order.css';
import { IconContext } from 'react-icons';

class CreateTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: "",
            size: "",
            people: [],
            loading: true,
            showPopup: false,
            id: "",
        };
        this.togglePopup = this.togglePopup.bind(this);

    }

    togglePopup(data) {
        this.setState({
            showPopup: !this.state.showPopup,
            id: data._id,
        });
    }

    async componentDidMount() {
        const url = "http://localhost:8020/book/tables";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.tables, loading: false });
        this.searchArray = data;
    }

    // handleTable(e) {
    //   let table = e.target.value;
    //   this.setState({ table: table });
    // }

    // handleSize(e) {
    //   let size = e.target.value;
    //   this.setState({ size: size });
    // }

    // handleUpload(e) {
    //   let table = this.state.table;
    //   let size = this.state.size;

    //   let formdata = new FormData();

    //   formdata.append("table", table);
    //   formdata.append("size", size);

    //   axios({
    //     url: `http://localhost:8020/book/table`,
    //     method: "POST",
    //     headers: {
    //       authorization: `your token`,
    //     },
    //     data: formdata,
    //   }).then(
    //     (res) => {
    //       this.componentDidMount();
    //     },
    //     (err) => {}
    //   );
    // }

    // delete(id) {
    //   fetch("http://localhost:8020/book/delete/" + id, {
    //     method: "DELETE",
    //   }).then((data) => {
    //     data.json().then((resp) => {
    //       alert("Are You Sure Delete");
    //       this.componentDidMount();
    //     });
    //   });
    // }

    render() {
        return (
            <div>
                <Sidesection />
                <div>
                    <div className='link-set'>
                        <div className="details-set_datavalue">
                            <Link to="/table-order" className="link-effect">
                                <div className="details-linkvalue">Table Order</div>
                            </Link>
                        </div>

                        <div className="details-set_data">
                            <Link to="/live-parcel" className="link-effect">
                                <div className="details-link">Parcel Order</div>
                            </Link>
                        </div>
                    </div>
                    <label className="table-n">Tables-Details</label>
                    <div>
                        <table className="table-b">
                            <td>Table-Number</td>
                            <td>Person</td>
                            <td>Action</td>
                        </table>
                        {this.state.people.map((table) => (
                            <div key={table._id}>
                                <div>
                                    <div>
                                        <table className="table-b1">
                                            <tr>
                                                <td> {table.table}</td>
                                                <td> {table.size}</td>
                                                <td>
                                                    <button
                                                        className="teb teb1"
                                                        onClick={() => this.togglePopup(table)}
                                                    >
                                                        View Order
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    {this.state.showPopup ? (
                                        <Popup
                                            _id={this.state.id}
                                            closePopup={() => this.togglePopup(table)}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTable;


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: "",
            size: "",
            People: [],
        };
    }


    async componentDidMount() {
        const url = "http://localhost:8020/order/orderlist/" + this.props._id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ People: data.list.orders, loading: false });
        this.searchArray = data;
    }


    // update(e) {
    //   let table = this.state.table;
    //   let size = this.state.size;

    //   let formdata = new FormData();

    //   formdata.append("table", table);
    //   formdata.append("size", size);

    //   axios({
    //     url: `http://localhost:8020/order/orderlist/` + this.props._id,
    //     method: "GET",
    //     headers: {
    //       authorization: `your token`,
    //     },
    //     data: formdata,
    //   }).then(
    //     (res) => {},
    //     (err) => {}
    //   );
    // }

    // handleTable1(e) {
    //   let table = e.target.value;
    //   this.setState({ table: table });
    // }

    // handleSize1(e) {
    //   let size = e.target.value;
    //   this.setState({ size: size });
    // }

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

        // if (!this.state.People.length) {
        //     return(
        //         alert("There is no order on this table !")
        //     )
        // }

        return (
            <div>
                <div className="add-op">
                    <div className="add-op1">
                        <div className="closeItem-set">
                            <button className="closeItem-btn" onClick={this.props.closePopup}>
                                X
            </button>
                        </div>

                        <div>
                            <label className="cto">Order Details</label>


                            <div>
                                {this.state.People.map(order => (
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
                                                                        <img height="100px" width="100px" src={suborder.product_id.imageUrl} />
                                                                    </div>
                                                                </td>
                                                                <td>{suborder.product_id.name}</td>
                                                                <td>{suborder.qty} x </td>
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

                            {/* <div>
                                <table className="to">
                                    <td>Name</td>
                                    <td>Status</td>
                                    <td>Grand Total</td>
                                    <td>Action</td>
                                </table>

                                {this.state.people.map((data) => (
                                    <div key={data._id}>
                                        <div>
                                            <div>
                                                <table className="to1">
                                                    <tr>
                                                        <td> {data.name}</td>

                                                        <td>{data.OrderIs}</td>
                                                        <td>{data.grandTotal}</td>
                                                        <td>
                                                            <button
                                                                className="ectb ectb1"
                                                                onClick={() => this.toggleSecondPopup(data)}
                                                            >
                                                                View Item
                            </button>

                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
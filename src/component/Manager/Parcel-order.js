import React, { Component } from 'react'
import './Pending-order.css';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Sidesection from './Sidesection';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class ParcelOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            orders: [],
            id: '',
            id1: '',
            Parcel: [],
            showPopup: false,
        };
        this.togglePopup = this.togglePopup.bind(this);


    }
    // async componentDidMount() {
    //     try {
    //         const url = "http://localhost:8020/order/getorders";
    //         const response = await fetch(url, {
    //             method: "GET",
    //             /* headers: {
    //                  "Content-type": "application/json; charset=UTF-8",
    //                  Authorization: `Bearer ` + localStorage.getItem("token")
    //              }, */
    //         });
    //         const data = await response.json();
    //         this.setState({ orders: data.orders, loading: false, });
    //         this.searchArray = data
    //     } catch (err) {
    //     }
    // }

    async componentDidMount() {
        try{
        const url = "http://localhost:8020/order/parcelorders";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ Parcel: data.orders, loading: false });
        this.searchArray = data;
        }
        catch(err){
            alert(err)
        }
    }

    togglePopup1(_id) {
        this.setState({
            showPopup1: !this.state.showPopup1,
            id1: _id,
        });
    }

    togglePopup(order1) {
        this.setState({
            showPopup: !this.state.showPopup,
            id: order1._id,
        });
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

        if (!this.state.Parcel.length) {
            return <div className="state">You not have any Orders</div>;
        }

        return (
            <div>
                <Sidesection />
                <div className='link-set'>
                        <div className="details-set_data">
                            <Link to="/pending-order" className="link-effect">
                                <div className="details-link">Pending</div>
                            </Link>
                        </div>

                        <div className="details-set_data">
                            <Link to="/done-order" className="link-effect">
                                <div className="details-link">Done</div>
                            </Link>
                        </div>

                        <div className="details-set_datavalue">
                            <Link to="/parcel-order" className="link-effect">
                                <div className="details-linkvalue">Parcel</div>
                            </Link>
                        </div>
                    </div>
                <div>
                    <div className="manager-List">
                        <h1 className="manager-title">Parcel Order</h1>
                    </div>


                    <div className='link-set'>
                        <div className="set_containt">
                        <div className="payment-details_lable">
                            Payment Status :-
                        </div>
                        </div>

                        <div className="details-set_datavalue">
                            <Link to="/parcel-order" className="link-effect">
                                <div className="details-linkvalue">Pending</div>
                            </Link>
                        </div>

                        <div className="details-set_data">
                            <Link to="/parcel-doneorder" className="link-effect">
                                <div className="details-link">Done</div>
                            </Link>
                        </div>
                    </div>

                    <table className="orders-table">

                        <td>Name</td>
                        <td>Date</td>
                        <td>GrandTotal</td>
                        <td>Status</td>
                        <td>Payment </td>
                        <td>Action</td>
                    </table>
                    {this.state.Parcel.filter(order1 => order1.PaymentStatus === "Pending").map(order1 => (
                        <div key={order1._id}>
                            <table className="data-table">
                                <tr>
                                    <td>{order1.name}</td>
                                    <td >{order1.createdAt}</td>
                                    <td>
                                        <div className="table-grandtotal">{order1.grandTotal} ₹</div>
                                    </td>
                                    <td>
                                        <div className="table-data">{order1.OrderIs}</div>
                                    </td>
                                    <td>
                                        <div className="table-data">{order1.paymentMethod}</div>
                                    </td>
                                    <td>
                                        <div className="order_btn_set">
                                            <div className='complaint-table_btns'>

                                                <IconButton aria-label="edit">
                                                    <VisibilityOutlinedIcon onClick={() => this.togglePopup(order1)} color="primary" fontSize="small" />
                                                </IconButton>
                                                {/* <button className="sb sb1" onClick={() => this.togglePopup(order1)}>
                                                View Order
                                            </button> */}
                                            </div>

                                            <div className='complaint-table_btn'>
                                                <button className="btn_performance" onClick={() => this.togglePopup1(order1._id)}>
                                                    Performance
                                            </button>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            </table>

                            {this.state.showPopup ? (
                                <Popup
                                    _id={this.state.id}
                                    closePopup={() => this.togglePopup(order1)}
                                />
                            ) : null}


                            {this.state.showPopup1 ? (
                                <Popup1
                                    _id={this.state.id1}
                                    closePopup1={() => this.togglePopup1(order1._id)}
                                />
                            ) : null}

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ParcelOrder;


class Popup extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: true,
            order: [],
            total: ''
        }
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/getorder/" + this.props._id;
            const response = await fetch(url, {
                method: "GET",
                /* headers: {
                     "Content-type": "application/json; charset=UTF-8",
                     Authorization: `Bearer ` + localStorage.getItem("token")
                 }, */
            });
            const data = await response.json();
            this.setState({ order: data.order.items, loading: false, total: data.order.grandTotal });
            this.searchArray = data
        } catch (err) {
        }
    }

    render() {

        return (
            <div className="popuporder">

                <div className="popuporder_inner">
                    <div className="popbtn2-order">
                        <button className="pop-order" onClick={this.props.closePopup}>X</button>
                    </div>
                    <div>
                        <div>
                            <div className="manager-List">
                                <h1 className="manager-title">Order Details</h1>
                            </div>

                            <table className="orders-table_data">

                                <td>Name</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Total</td>
                            </table>
                            {this.state.order.map(order1 => (
                                <div key={order1._id}>
                                    <table className="data-table">
                                        <tr>
                                            <td>{order1.product_id.name}</td>
                                            <td >{order1.qty}</td>
                                            <td>
                                                <div className="table-data"  >{order1.productPrice} ₹</div>
                                            </td>
                                            <td>
                                                <div className="table-grandtotal">{order1.total} ₹ </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            ))}

                            <div className="orderTotal_popup">
                                Grand Total : {this.state.total}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

class Popup1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8020/order/howlong/" + this.props._id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ message: data.message, loading: false });
        this.searchArray = data;
    }

    render() {
        return (
            <div className="popuporder">
                <div className="popuporder_inner">
                    <div className="popbtn2-order">
                        <button className="pop-order" onClick={this.props.closePopup1}>
                            X
              </button>
                    </div>

                    <div className="manager-List">
                        <h1 className="manager-title">Order Performance</h1>
                    </div>

                    <div className="table-data"> {this.state.message}</div>
                </div>
            </div>
        );
    }
}

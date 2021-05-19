import React, { Component } from 'react'
import './All-order.css';
import Sidesection from './Sidesection';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            orders: [],
            id: '',
            showPopup: false,
        };
        this.togglePopup = this.togglePopup.bind(this);


    }
    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/getorders";
            const response = await fetch(url, {
                method: "GET",
                /* headers: {
                     "Content-type": "application/json; charset=UTF-8",
                     Authorization: `Bearer ` + localStorage.getItem("token")
                 }, */
            });
            const data = await response.json();
            this.setState({ orders: data.orders, loading: false, });
            this.searchArray = data
        } catch (err) {
        }
    }

    togglePopup(_id) {
        this.setState({
            showPopup: !this.state.showPopup,
            id: _id,
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

        if (!this.state.orders.length) {
            return <div className="state">You not have any Orders</div>;
        }

        return (
            <div>
                <Sidesection />
                <div>
                    <div className="manager-List">
                        <h1 className="manager-title">Order History</h1>
                    </div>
                    <table className="orders-table">

                        <td>Name</td>
                        <td>Date</td>
                        <td>GrandTotal</td>
                        <td>Status</td>
                        <td>Payment </td>
                        <td>Action</td>
                    </table>
                    {this.state.orders.map(order1 => (
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
                                        <div className='complaint-table_btn'>
                                            <button className="sb sb1" onClick={() => this.togglePopup(order1._id)}>
                                                View Order
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            {this.state.showPopup ? (
                                <Popup
                                    _id={this.state.id}
                                    closePopup={() => this.togglePopup(order1._id)}
                                />
                            ) : null}

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default OrderList;


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


/*

  <div className="cookall-orderbtn">
                                    <div className="cookall-orders">
                                        {order1.items.map((suborder) =>
                                            <div key={suborder._id}>
                                                <div className="cooksingle-order">
                                                    <div classname="cookcart-images">
                                                        <img height="100px" width="100px" src={suborder.productId} />
                                                    </div>
                                                    <div className="cookorder-data">Quantity:{suborder.qty}</div>
                                                    <div className="cookorder-data">Priority:{suborder.priority}</div>
                                                    <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
                                                    <div className="cookorder-total">Grand Total:{suborder.total} ₹ </div>
                                                </div>
                                            </div>)}
                                    </div>
                                </div>
                                 */

/*
import { render } from 'node-sass';
import React, { Component } from 'react'
import Sidesection from './Sidesection';
import { components } from 'react-select';
import './All-order.css';

class Allorder extends components{
    constructor(props) {
        super(props);
        this.state = {
          people: [],
          loading: true,
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8020/order/getorders";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.orders, loading: false });
        this.searchArray = data;
      }

render()  {
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

    return(
        <div>
            <Sidesection />
            <div className="order-head">Order List</div>
            <div className="cookorder-card">
                        {this.state.people.map(order1 => (
                            <div key={order1._id}>
                                <div className="order-head">
                                    <div className="cookorder-total">Name : {order1.name}</div>
                                    <div className="cookorder-total">Grand Total : {order1.grandTotal}</div>
                                    <div className="cookorder-total">Status : {order1.OrderIs}</div>
                                    <div className="cookorder-total">Date : {order1.createdAt}</div>
                                </div>
                                <div className="cookall-orderbtn">
                                    <div className="cookall-orders">
                                        {order1.items.map((suborder) =>
                                            <div key={suborder._id}>
                                                <div className="cooksingle-order">
                                                    <div classname="cookcart-images">
                                                        <img height="100px" width="100px" src={suborder.productId} />
                                                    </div>
                                                    <div className="cookorder-data">Quantity:{suborder.qty}</div>
                                                    <div className="cookorder-data">Priority:{suborder.priority}</div>
                                                    <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
                                                    <div className="cookorder-total">Grand Total:{suborder.total} ₹ </div>
                                                </div>
                                            </div>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
        </div>

    )

}
}

export default Allorder; */
import React, { Component } from 'react'
import './OrderList.css';
import CookSidesection from './Cook-sidesection';

export class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showPopup: false,
            showDeletePopup: false,
            activeOrderId: null,
            AllOrder: [],
        };

        this.togglePopup=this.togglePopup.bind(this);
        this.toggleDeletePopup=this.toggleDeletePopup.bind(this)


    }
    togglePopup(order1) {
        this.setState({
            showPopup: !this.state.showPopup,
            activeOrderId: order1._id

        });
    }

    toggleDeletePopup(order1) {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup,
            activeOrderId: order1._id,
        });
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/list";
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    OrderIs:"Pending",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }, 
            });
            const data = await response.json();
            this.setState({ AllOrder: data.list });
            this.searchArray = data
        } catch (err) {
        }
    }

    render() {
        return (
            <div>
                <CookSidesection />
                <div>
            <div className="cookorder-List">
                <h1 className="cookorder-title">Orders</h1>
            </div>
            <div className="cookorder-card">
                {this.state.AllOrder.map(order1 => (
                    <div key={order1._id}>
                        <div className="cookorder-total">Name:{order1.name}</div>
                        <div className="cookall-orderbtn">
                        <div className="cookall-orders">
                            {order1.items.map((suborder) =>
                                <div key={suborder._id}>
                                    <div className="cooksingle-order">
                                        <div classname="cookcart-images">
                                            <img height="100px" width="100px" src={suborder.productId.imageUrl} />
                                        </div>
                                        <div className="cookorder-data">Quantity:{suborder.qty}</div>
                                        <div className="cookorder-data">Priority:{suborder.priority}</div>
                                        <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
                                        <div className="cookorder-total">Grand Total:{suborder.total} ₹ </div>
                                    </div>
                                </div>)}
                        </div>
                        <div className="accept-reject" >
                        <button className="cart-button" onClick={() => this.togglePopup(order1)}>Accept Order</button>
                        {this.state.showPopup ?
                            <Popup _id={this.state.activeOrderId}
                                text='Close Me'
                                closePopup={() => this.togglePopup(order1)}
                            />
                            : null
                        }
                        <button className="cart-button" onClick={() => this.toggleDeletePopup(order1)}>Reject Order</button>
                        {this.state.showDeletePopup ?
                            <DeletePopup _id={this.state.activeOrderId}
                                text='Close Me'
                                closeDeletePopup={() => this.toggleDeletePopup(order1)}
                            />
                            : null
                        }
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </div>       
            </div>
        )
    }
}

export default OrderList;

class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    async accept() {
        try {
            const response = await fetch("http://localhost:8020/order/receive/" + this.props._id, {
                method: "PUT",
            })
            let data = await response.json()
            alert("Your Order is Received !")
            console.log(data)
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
        }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Order Accept</label>
                            <div>Are You Sure to Confirm the Order.</div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.accept()}>Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class DeletePopup extends React.Component {
    constructor(props) {
        super(props);
    }

    async cancle() {
        try {
            const response = await fetch("http://localhost:8020/order/cancel/" + this.props._id, {
                method: "PUT",
            })
            let data = await response.json()
            alert("Your Order is Rejected !")
            console.log(data)
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
        }


    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closeDeletePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Order Reject</label>
                            <div>Are You Sure to Reject the Order.</div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.cancle()}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


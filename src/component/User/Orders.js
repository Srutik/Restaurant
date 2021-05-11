import React, { Component } from 'react'
import UserNav from './User-Nav';
import './Orders.css'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
        }
    }

    handleComplain(e) {
        let title = e.target.value
        this.setState({ title: title })
        console.log(title);
    }

    handleComplainData(e) {
        let description = e.target.value
        this.setState({ description: description })
        console.log(description);
    }


    async handleSubmit(title, description) {
        try {

            const response = await fetch("http://localhost:8020/complaint/complaint/" + this.props._id, {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    message: description
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            })
            let data = await response.json()
            alert("Your Complain is Submit !")
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className='complainbox-popup'>

                <div className='complainbox-popup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Title</label>
                            <div>
                                <input className="input" type="text" name="title" placeholder="Enter Complain Title" onChange={(e) => this.handleComplain(e)} />
                            </div>

                            <label htmlFor="Order-Name">Enter Complain</label>
                            <div>
                                <textarea className="textarea" type="text" name="description" placeholder="Explain please ! what you dislike." onChange={(e) => this.handleComplainData(e)} />

                            </div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.handleSubmit(this.state.title, this.state.description)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            AllOrder: [],
            quantity: 0,
            activeItemId: null,
            showPopup: false
        };
        this.togglePopup = this.togglePopup.bind(this)

    }

    togglePopup(order) {
        this.setState({
            showPopup: !this.state.showPopup,
            activeItemId: order._id
        });
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/myorders";
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            this.setState({ AllOrder: data.data.orders });
            console.log(this.state.AllOrder)
        } catch (err) {
        }
    }


    render() {
        return (
        <div>
            <UserNav />
            <div className="order-List">
                <h1 className="order-title">Your Orders</h1>
            </div>
            <div className="order-card">
                {this.state.AllOrder.map(order => (
                    <div key={order._id}>
                        <div className="head-order">
                            <div className="order-total">Name : {order.name}</div>
                            <div className="order-total">Order Total : {order.grandTotal.toFixed(2)}</div>
                            <div className="order-total">Order Status :- {order.OrderIs}</div>
                            <div className="order-total">Date : {order.createdAt} </div>

                        </div>
                        <div className="set-complaint">
                        <div className="all-orders">
                            {order.items.map((suborder) =>
                                <div key={suborder._id}>
                                    <div className="single-order">
                                        <div classname="cart-images">
                                            <img height="100px" width="100px" src={suborder.product_id.imageUrl} />
                                        </div>
                                        <div className="order-data">Name : {suborder.product_id.name}</div>
                                        <div className="order-data">Original Price : {suborder.product_id.originalPrice} ₹ </div>
                                        <div className="order-data">Quantity : {suborder.qty}</div>
                                        <div className="order-data">Offer Price : {suborder.product_id.offerPrice} ₹ </div>
                                        <div className="order-total">Item Status : {suborder.progress}</div>
                                        <div className="order-total">Grand Total : {suborder.total.toFixed(2)} ₹ </div>
                                    </div>
                                    <div>
                                            
                                    </div>
                                </div>)}
                        </div>
                        <div className="complaints-center">
                                            <button className="feedback-btn" onClick={() => this.togglePopup(order)}>Complain</button>
                                            {this.state.showPopup ?
                                                <Popup _id={this.state.activeItemId}
                                                    text='Close Me'
                                                    closePopup={() => this.togglePopup(order)}
                                                />
                                                : null
                                            }
                                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )
    }
}

export default Orders;
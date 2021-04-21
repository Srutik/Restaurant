import React, { Component } from 'react'
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

            const response = await fetch("http://192.168.0.61:8020/complaint/complaint/" + this.props._id, {
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
            <div className='complain-popup'>

                <div className='complain-popup_inner'>
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

    togglePopup(suborder) {
        this.setState({
            showPopup: !this.state.showPopup,
            activeItemId: suborder.productId._id
        });
    }


    async componentDidMount() {
        try {
            const url = "http://192.168.0.61:8020/order/myorders";
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            this.setState({ AllOrder: data.data.orders });
            this.searchArray = data
        } catch (err) {
        }
    }

    render() {
        return (<div>
            <div className="order-List">
                <h1 className="order-title">Your Orders</h1>
            </div>
            <div className="order-card">
                {this.state.AllOrder.map(order1 => (
                    <div key={order1._id}>
                        <div className="all-orders">
                            {order1.items.map((suborder) =>
                                <div key={suborder._id}>
                                    <div className="single-order">
                                        <div classname="cart-images">
                                            <img height="100px" width="100px" src={suborder.productId.imageUrl} />
                                        </div>
                                        <div className="order-data">Name:{suborder.productId.name}</div>
                                        <div className="order-data">Original Price:{suborder.productId.originalPrice} ₹ </div>
                                        <div className="order-data">Quantity:{suborder.qty}</div>
                                        <div className="order-data">Price:{suborder.price} ₹ </div>
                                        <div className="order-total">Grand Total:{suborder.total} ₹ </div>
                                        <div>
                                            <button className="feedback-btn" onClick={() => this.togglePopup(suborder)}>Complain</button>
                                            {this.state.showPopup ?
                                                <Popup _id={this.state.activeItemId}
                                                    text='Close Me'
                                                    closePopup={() => this.togglePopup(suborder)}
                                                />
                                                : null
                                            }
                                        </div>
                                    </div>
                                    <div></div>

                                </div>)}

                        </div>

                    </div>
                ))}
            </div>
        </div>
        )
    }
}
export default Orders;


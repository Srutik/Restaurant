import React, { Component } from 'react'
import './Orders.css'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null
        }
    }

    handleFeedback(e) {
        let name = e.target.value
        this.setState({ name: name })
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
                            <label htmlFor="Order-Name">Enter Feedback</label>
                            <div>
                                <textarea className="textarea" type="text" name="name" placeholder="Enter Order Name" onChange={(e) => this.handleFeedback(e)} />

                            </div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.handleSubmit(this.state.name)}>Submit</button>
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
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
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
        return (
            <div className="order-card">
                {this.state.AllOrder.map(order1 => (
                    <div key={order1._id}>
                        <div className="all-orders">
                            <div className="all-data">
                                <div className="order-data">SubTotal:{order1.subTotal}</div>
                                <div className="order-data">Payment-methods:{order1.paymentMethod}</div>
                                <div className="order-data">Product-Id:{order1._id}</div>
                                <div>
                                    <button className="feedback-btn" onClick={this.togglePopup.bind(this)} >Feedback</button>
                                    {this.state.showPopup ?
                            <Popup
                                text='Close Me'
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Orders;


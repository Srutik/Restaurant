import React, { Component } from 'react';
import './Process-order.css';
import CookSidesection from './Cook-sidesection';

export class Processorder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showPopup: false,
            activeOrderId: null,
            ProcessOrder: [],
        };
        this.togglePopup=this.togglePopup.bind(this);

    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/list";
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    OrderIs:"In Progress",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }, 
            });
            const data = await response.json();
            this.setState({ ProcessOrder: data.list });
            this.searchArray = data
        } catch (err) {
        }
    }

    togglePopup(order) {
        this.setState({
            showPopup: !this.state.showPopup,
            activeOrderId: order._id

        });
    }

    render() {
        return (
            <div className="Cook-inprocess">
                <div>
                <CookSidesection />
                </div>
             <div className="cookprocessorder-title">Processing Order</div>
             <div className="cookorder-card">
                {this.state.ProcessOrder.map(order => (
                    <div key={order._id}>
                        <div className="done-head">
                        <div className="cookorder-total">Name:{order.name}</div>
                        <div className="cookorder-total">Grand Total:{order.grandTotal}</div>
                        <div className="cookorder-total">Date:{order.createdAt}</div>
                        </div>
                        <div className="cookall-donebtn">
                        <div className="cookall-orderDone">
                            {order.items.map((suborder) =>
                                <div key={suborder._id}>
                                    <div className="cooksingle-orderDone">
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
                        <div className="done-btnset"><button className="done-button" onClick={() => this.togglePopup(order)}>Order Done</button>
                        {this.state.showPopup ?
                            <Popup _id={this.state.activeOrderId}
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

export default Processorder;


class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    async accept() {
        try {
            const response = await fetch("http://localhost:8020/order/done/" + this.props._id, {
                method: "PUT",
            })
            let data = await response.json()
            console.log(data)
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
        }

    render() {
        return (
            <div className='Done-popup'>
                <div className='Donepopup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Order Complete</label>
                            <div className="done-content">Are You Sure to Complete the Order.</div>
                            <div className="orderDone-btn">
                                <button className="done-button" onClick={() => this.accept()}>Order Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

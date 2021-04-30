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

    render() {
        return (
            <div className="Cook-inprocess">
                <div>
                <CookSidesection />
                </div>
             <div className="cookprocessorder-title">Processing Order</div>
             <div className="cookorder-card">
                {this.state.ProcessOrder.map(order1 => (
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
                      </div>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default Processorder;

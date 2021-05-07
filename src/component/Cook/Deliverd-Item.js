import React, { Component } from 'react'
import './Deliverd-item.css';
import CookSidesection from './Cook-sidesection';


export class DeliverdItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showPopup: false,
            activeOrderId: null,
            DoneOrder: []
        };
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/list";
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    OrderIs:"Done",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }, 
            });
            const data = await response.json();
            this.setState({ DoneOrder: data.list });
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
             <div className="cookDoneorder-title">Deliverd Order</div>
             <div className="cookDone-card">
                {this.state.DoneOrder.map(order1 => (
                    <div key={order1._id}>
                        <div className="done-head">
                            <div className="cookDone-total">Name:{order1.name}</div>
                            <div className="cookDone-total">Order Total:{order1.grandTotal.toFixed(2)}</div>
                            <div className="cookDone-total">Date:{order1.createdAt}</div>
                        </div>
                        <div className="cookDone-orderbtn">
                        <div className="cookDone-orders">
                            {order1.items.map((suborder) =>
                                <div key={suborder._id}>
                                    <div className="cooksingle-Doneorder">
                                        <div classname="cookcart-images">
                                            <img height="100px" width="100px" src={suborder.product_id} />
                                        </div>
                                        <div className="cookorder-data">Quantity:{suborder.qty}</div>
                                        <div className="cookorder-data">Priority:{suborder.priority}</div>
                                        <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
                                        <div className="cookorder-total">Grand Total:{suborder.total.toFixed(2)} ₹ </div>
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

export default DeliverdItem;


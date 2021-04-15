import React, { Component } from 'react'
import { Button } from '../Button';
import './Cart.css';

import './Pop-up.css';

class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            cartItem: [],
        };

    }


    async componentDidMount() {
        try {
            const url = "http://192.168.0.61:8020/cart/getcart";
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            this.setState({ cartItem: data.Your_Cart.items, loading: false });
            this.searchArray = data
        } catch (err) {
            alert("Cart is Empty !")
        }
    }

    onShow() {

        return (
            <div>

            </div>
        )

    }

    handleDelete() {
        fetch("http://192.168.0.61:8020/cart/emptycart", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ` + localStorage.getItem("token")
            },
        }).then((data) => {
            data.json().then((response) => {
                alert("Your cart is Empty !")
                window.location.reload(false)
            })
        })


        alert("Are You Sure to Empty Your Cart !")

    }

    render() {
        return (
                <div className="cartbox1">
                    <div className="ListS">
                        <h1 className="titleS">Cart</h1>
                    </div>
                   

                        {this.state.cartItem.map(item => (
                            <div key={item._id}>
                                <div className="cartItems1">
                                    <div className="fontS">Quantity:{item.qty}
                                        <a className="fontS">Price:{item.price}</a>
                                        <div className="fontS">Total:{item.total}</div>
                                    </div>

                                </div>
                            </div>
                        ))}
                   <div className="Buttons">
                    <button className="cart-button" onClick={this.handleDelete}>Delete Cart</button>
                    <button className="cart-button" onClick={this.onShow}>Make Order</button>
                    </div>


                </div>


           
        );
    };
}

export default Cart;
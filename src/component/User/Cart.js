import React, { Component } from 'react'
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import img from './carts.png';
import './Cart.css';
import './Pop-up.css';

class DeletePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
        }
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
                window.location.reload(false)
            })
        })
    }

    render() {
        return (
            <div className='Deletepopup'>
                <div className='Deletepopup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <div>Are You Sure to Delete Cart !</div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={this.handleDelete}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            name: null
        }
    }

    
    async handleSubmit(name) {
        try {
            const response = await fetch("http://192.168.0.61:8020/order/makeorder", {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            })
            let data = await response.json()
            alert("Your Order is Submit !")
            this.handleDelete()
            console.log(data)
        } catch (err) {
            console.log(err)
        }

    }

    handleName(e) {
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
                            <label htmlFor="Order-Name">Order Name</label>
                            <div>
                                <input className="input" type="text" name="name" placeholder="Enter Order Name" onChange={(e) => this.handleName(e)} />

                            </div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.handleSubmit(this.state.name)}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            cartItem: [],
            quantity: 0,
            showPopup: false,
            showDeletePopup: false
        };
       
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    toggleDeletePopup() {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup
        });
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
            this.setState({ cartItem: data.Your_Cart.items, quantity: data.Your_Cart.items.qty, loading: false });
            this.searchArray = data
        } catch (err) {
        }
    }


    render() {

          if (this.state.loading) {
            return <div className="empty-cart">
                <div className="transparent-cart">
                    <div className="logo">
                        <img src={img} />
                    </div>
                    <div className="text-area">
                        <div className="state">Opps ! Your cart is Empty</div>
                        <div className="state">Please Visit Our Menu First.</div>
                    </div>
                    <div className="buttons">
                        <Link to='/menu'>
                            <button className="cart-menu">Menu</button>
                        </Link>
                    </div>
                </div>

            </div>
        }

        return (
            <div className="cartbox1">
                <div className="ListS">
                    <h1 className="titleS">Cart</h1>
                </div>

                <div className="cartView">
                    {this.state.cartItem.map(item => (
                        <div key={item._id}>
                            <div className="cartItems1">
                                <div className="fontS">Quantity:{item.qty}</div>
                                    <div className="fontS">Price:{item.price}</div>
                                    <div className="fontS">Priority:{item.priority}</div>
                                    <div className="fontS">Total:{item.total}</div>
                            </div>
                        </div>
                    ))}
                    <div className="Buttons">
                        <button className="cart-button" onClick={this.toggleDeletePopup.bind(this)}>Delete Cart</button>
                        {this.state.showDeletePopup ?
                            <DeletePopup
                                text='Close Me'
                                closePopup={this.toggleDeletePopup.bind(this)}
                            />
                            : null
                        }
                        <button className="cart-button" onClick={this.togglePopup.bind(this)}>Make Order</button>
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
        );
    };
}

export default Cart; 
import React, { Component } from 'react'
import { Button } from '../Button';
import { Link }  from 'react-router-dom';
import img from './carts.png';
import './Cart.css';

import './Pop-up.css';

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:null
        }
    }

    async handleSubmit(name) {
        try {
          const response = await fetch("http://192.168.0.61:8020/order/makeorder" , {
            method: "PUT",
            body: JSON.stringify({
              name:name,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ` + localStorage.getItem("token")
            },
          })
          let data = await response.json()
          alert("Your Order is Submit !")
          console.log(data)
        } catch (err) {
          console.log(err)
        }
       
      }

      handleName(e) {
          let name = e.target.value
          this.setState({name : name})
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
                            <input className="input" type="text" name="name" placeholder="Enter Order Name" onChange={(e) => this.handleName(e)}/>

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
            showPopup: false
        };
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
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

    add() {
        this.setState({ quantity: this.state.quantity + 1 })
    }

    remove() {
        this.setState({ quantity: this.state.quantity - 1 })
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


        alert("Are You Sure to Empty Your Cart !")

    }

    render() {

    if (this.state.loading) {
      return <div className="empty-cart">
          <div className="transparent-cart">
      <div className="logo">
        <img  src={img} />
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
                                <div className="fontS">Quantity:{item.qty}
                                    <a className="fontS">Price:{item.price}</a>
                                    <div className="fontS">Total:{item.total}</div>
                                    <button className="add-button" onClick={this.add}>+</button>
                                    {item.qty}
                                    <button className="add-button"onClick={this.remove}>-</button>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className="Buttons">
                        <button className="cart-button" onClick={this.handleDelete}>Delete Cart</button>
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
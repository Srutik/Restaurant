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
            loading: true,
        }
    }

    handleDelete() {
        fetch("http://localhost:8020/cart/emptycart", {
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
            loading: true,
            name: null
        }
    }


    async handleSubmit(name) {
        try {
            const response = await fetch("http://localhost:8020/order/makeorder", {
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
            console.log(data)
            window.location.reload(false)
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
            <div className='pop-up'>
                <div className='pop-up_inner'>
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


class TablePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            table: null
        }
    }


    async handleOnTable(table) {
        try {
            const response = await fetch("http://localhost:8020/book/checkin", {
                method: "POST",
                body: JSON.stringify({
                    table:table,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            })
            let data = await response.json()
            alert("Your Table is Booked !")
            console.log(data)
        }
        catch(err) {
            alert(err)
            window.location.reload(false)
        }
    }

    handleNumber(e) {
        let table = e.target.value
        this.setState({ table:table })
    }

    render() {
        return (
            <div className='pop-up'>
                <div className='pop-up_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closeTablePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Table Number</label>
                            <div>
                                <input className="input" type="number" table="table" placeholder="Enter Table Number" onChange={(e) => this.handleNumber(e)} />

                            </div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.handleOnTable(this.state.table)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class PopupParcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: null
        }
    }

    async handleParcel(name) {
        try {
            const response = await fetch("http://localhost:8020/order/parcel/makeorder", {
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
            console.log(data)
            window.location.reload(false)
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
            <div className='pop-up'>
                <div className='pop-up_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closeParcelPopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Order Name</label>
                            <div>
                                <input className="input" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />

                            </div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.handleParcel(this.state.name)}>Place Order</button>
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
            subTotal: null,
            showPopup:false,
            showTablePopup: false,
            showParcelPopup: false,
            showDeletePopup: false
        };

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    toggleTablePopup() {
        this.setState({
            showTablePopup: !this.state.showTablePopup
        });
    }

    toggleParcelPopup() {
        this.setState({
            showParcelPopup: !this.state.showParcelPopup
        });
    }

    toggleDeletePopup() {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup
        });
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/cart/getcart";
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            this.setState({ cartItem: data.Your_Cart.items, subTotal: data.Your_Cart.subTotal, loading: false });
            this.searchArray = data
        } catch (err) {
        }
    }

    async placeOrder() {
        try {
            const response = await fetch("http://localhost:8020/order/makeorder", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            })
            let data = await response.json()
            alert("Your Order is Submit !")
            console.log(data)
            window.location.reload(false);
        } catch (err) {
            console.log(err)
        }
    }


    async handleSubmit() {
        try {
            const response = await fetch("http://localhost:8020/order/makeorder", {
                method: "PUT",
                // body: JSON.stringify({
                //     name: name,
                // }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            })
            let data = await response.json()
            alert("Your Order is Submit !")
            console.log(data)
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }

    }

    // async parcelOrder() {
    //     try {
    //         const response = await fetch("http://localhost:8020/order/parcel/makeorder", {
    //             method: "PUT",
    //             headers: {
    //                 "Content-type": "application/json; charset=UTF-8",
    //                 Authorization: `Bearer ` + localStorage.getItem("token")
    //             },
    //         })
    //         let data = await response.json()
    //         alert("Your Parcel Order is Submit !")
    //         console.log(data)
    //         window.location.reload(false)
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    render() {

        if (this.state.loading) {
            return <div className="empty-cart">
                <div className="transparent-cart">
                    <div className="logo">
                        <img height="200px" width="200px" src={img} />
                    </div>
                    <div className="text-area">
                        <div className="state">Opps ! Your cart is Empty</div>
                        <div className="state">Please Visit Our Menu First.</div>
                    </div>
                    <div className="emptycart_btn">
                        <div className="buttons">
                            <Link to='/menu'>
                                <button className="cart-menu">Menu</button>
                            </Link>
                        </div>

                        <div className="buttons">
                            <Link to='/orders'>
                                <button className="cart-order">View Order</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        }

        return (
            <div>
                <div className="cartbox1">
                    <div className="ListS">
                        <h1 className="titleS">Cart</h1>
                    </div>

                    <div className="cartView">
                        {this.state.cartItem.map(item => (
                            <div key={item._id}>
                                <div className="cartItems1">
                                    <div classname="cart-images">
                                        <img height="100px" width="100px" src={item.product_id.imageUrl} />
                                        <div className="fontS">Name:{item.product_id.name}</div>
                                    </div>
                                    <div className="fontS">Priority:{item.priority}</div>
                                    <div className="fontS">Price:{item.productPrice} 🗙 Quantity:{item.qty}</div>
                                    <div className="fontS-total">SubTotal:{item.total}</div>
                                </div>
                                <div className="Line">______________________________________________________________</div>
                            </div>
                        ))}
                        <div className="Grand-Total">Grand Total = {this.state.subTotal} ₹</div>


                        <div className="Buttons">

                                <button className="cart-button" onClick={this.toggleTablePopup.bind(this)}>Book Table</button>
                                {this.state.showTablePopup ?
                                <TablePopup
                                    text='Close Me'
                                    closeTablePopup={this.toggleTablePopup.bind(this)}
                                />
                                : null
                            }

                        <button className="cart-button" onClick={() => this.handleSubmit(this)}>Place Order</button>
                        {/* {this.state.showPopup ?
                                <Popup
                                    text='Close Me'
                                    closePopup={this.togglePopup.bind(this)}
                                />
                                : null
                            } */}


                            {/* <button className="cart-button" onClick={this.togglePopup.bind(this)}>Make Note</button>
                        {this.state.showPopup ?
                            <Popup
                                text='Close Me'
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        } */}

                            <button className="cart-button" onClick={this.toggleDeletePopup.bind(this)}>Delete Cart</button>
                            {this.state.showDeletePopup ?
                                <DeletePopup
                                    text='Close Me'
                                    closePopup={this.toggleDeletePopup.bind(this)}
                                />
                                : null
                            }

                            <button className="cart-button" onClick={this.toggleParcelPopup.bind(this)}>Parcel Order</button>
                            {this.state.showParcelPopup ?
                                <PopupParcel
                                    text='Close Me'
                                    closeParcelPopup={this.toggleParcelPopup.bind(this)}
                                />
                                : null
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    };
}

export default Cart;
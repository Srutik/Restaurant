import React, { Component } from 'react'
import './Cart.css';

export class Cart extends Component {
    state = {
        loading: true,
        cartItem: [],
      };
    
    
      async componentDidMount() {
    try{
        const url = "http://192.168.0.61:8020/cart/getcart";
        const response = await fetch(url,{
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
              },
        });
        const data = await response.json();
        this.setState({ cartItem: data.Your_Cart.items });
        this.searchArray = data

        return(
          this.componentDidMount()
        )}
        catch(err){
        }
      }
    render() {
        

        return (
            <div>
              <h1 className="List">Cart</h1>
      <div className="cart">
        
        {this.state.cartItem.map(item => (
          <div key={item._id}>
            <div className="cartItems">
              <div className="font">Quantity:{item.qty}</div>
              <a>Price:{item.price}</a>
              <div className="font">Total:{item.total}</div>
              </div> 
              </div>      
        ))}  
        <button>Make Order</button>       
        </div> 
            </div>
        )
    }
}

export default Cart;

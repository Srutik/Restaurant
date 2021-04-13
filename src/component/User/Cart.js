import Item from 'antd/lib/list/Item';
import React, { Component } from 'react'

export class Cart extends Component {
    state = {
        loading: true,
        cart: [],
      };
    
    
      async componentDidMount() {
    
        const url = "http://192.168.0.2:8080/cart/getcart";
        const response = await fetch(url,{
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
              },
        });
        const data = await response.json();
        this.setState({ cart: data.Your_Cart.items });
        this.searchArray = data
      }
    render() {
        

        return (
            <div>
      <div className="card">
        {this.state.cart.map(item => (
          <div key={item._id}>
           
              <div className="FoNt">Quantity:{item.qty}</div>
              <div className="FoNt">Price:{item.price}</div>
              <div className="FoNt">Total:{item.total}</div>
              </div>
              
        ))}
             
        </div> 
            </div>
        )
    }
}

export default Cart;

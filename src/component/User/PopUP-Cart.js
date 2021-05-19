import React, { Component } from 'react'
import './Popup-cart.css';

import './Pop-up.css';

 class Popupcart extends Component {
    constructor(props){
        super(props)
        this.state = { 
            loading: true,
        cartItem: [],
                      };

    }

    async componentDidMount() {
        try{
            const url = "http://localhost:8020/cart/getcart";
            const response = await fetch(url,{
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                  },
            });
            const data = await response.json();
            this.setState({ cartItem: data.Your_Cart.items });
            this.searchArray = data
    }catch(err) {
    alert("Cart is Empty !")   
 }
}     

onShow() {

  return(
<div>
  
</div>
  )

}

          handleDelete() {
                  fetch("http://localhost:8020/cart/emptycart" , { 
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
            <div className="popupcart-box">
            <div className="cartbox">
            <button className="closecart-icon" onClick={this.props.handleClose.bind(this)}>x</button>
            <div className="List">
                <h1 className="titles">Cart</h1>
            </div>
      <div className="cart">
        
        {this.state.cartItem.map(item => (
          <div key={item._id}>
            <div className="cartItems">
              <div className="fonts">Quantity:{item.qty}
              <a className="fonts">Price:{item.price}</a>
              <div className="fonts">Total:{item.total}</div>
</div>
              
              </div> 
              </div>      
        ))} 
        </div> 
        <button onClick={this.onShow}>Make Order</button>       
        <button onClick={this.handleDelete}>Delete Cart</button>
            
         
            

            </div>

           
        </div>
        );
  };
}

export default Popupcart;



   
 





/* 

import React from "react";
import './Menu.css';
import Cart from './Cart';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    loading: true,
    people: [],
  };


  async componentDidMount() {

    const url = "http://192.168.0.2:8080/feed/getposts";
    const response = await fetch(url,{
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token")
      },
    });
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
    localStorage.setItem("data", JSON.stringify(data))
  }

  async addToCart(_id, qty) {
    try {
      const response = await fetch("http://192.168.0.2:8080/cart/addtocart/" + _id, {
        method: "POST",
        body: JSON.stringify({
          email:"srutik.borda@gmail.com",
          qty: qty,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
      })
      let data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }



  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }


    
    return (
      <div>
      <h1 className="List">Category List</h1>
      <div className="card">
        {this.state.people.map(person => (
          <div key={person._id}>
            <div className="cardItem">
             <div classname="image">
               <img src={person.imageUrl}/>
            </div> 
              <div className="content">
              <div className="FoNt">Name:{person.name}</div>
              <div className="FoNt">Price:{person.price}</div>
              <div >
                <button className="addbutton" onClick={(e) => this.addToCart(person._id, 1)}>Add to Cart</button>
              </div>
              </div>
              
            </div>
          </div>
        ))}       
        </div>
        </div>
    );
  }
}

export default Menu; */



import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    loading: true,
    people: [],
    cart:[]
  };


  async componentDidMount() {
    const url = "http://192.168.0.61:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
  }

 async handleClick(_id) {
        
  const url = "http://192.168.0.61:8020/menu/menu/" + _id;
  const response = await fetch(url);
  const data = await response.json();
  this.setState({ cart: data.product });
  this.searchArray = data
}



  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.people.length) {
      return <div>didn't get Menu</div>;
    }

    
    return (
      <div>
      <h1 className="List">Category List</h1>
      <div className="card">
        {this.state.people.map(person => (
          <div key={person._id}>
            <div className="cardItem">
             <div classname="image" >
               <img src={person.imageUrl}/>
            </div> 
              <div className="content">
              <div className="FoNt">{person.categoryName}</div>
              <div className="FoNt">{person.name}</div>
              <div className="FoNt">{person.description}</div>
              <div className="btton">
                <button className="button" onClick={() => this.handleClick(person._id)}>Menu</button>
              </div>
              </div>
              
            </div>
          </div>
        ))}       
        </div>



        <div>
        <h1 className="List">Menu List</h1>
      <div className="card">
        {this.state.cart.map(person => (
          <div key={person._id}>
            <div className="cardItem">
             <div classname="image" >
               <img src={person.imageUrl}/>
            </div> 
              <div className="content">
              <div className="FoNt">{person.name}</div>
              <div className="FoNt">{person.price}</div>
              <div className="FoNt">{person.description}</div>
              </div>
              
            </div>
          </div>
        ))}       
        </div>

        </div>
        </div>
    );
  }
}

export default Menu; 
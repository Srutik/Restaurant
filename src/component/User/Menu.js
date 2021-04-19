
import React from "react";
import './Menu.css';
import MenuComponent from './MenuComponent';
import {Link, useHistory} from 'react-router-dom';
import UserNav from './User-Nav';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      carts: [],
      counter: 0,
      priority: 1,
      quantity: 1
    };
  }
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
    this.setState({ carts: data.products, });
    this.searchArray = data 
  }

  handlepriority(event) {
    let priority = event.target.value
    this.setState({ priority: priority });
  }

  handlequantity(event) {
    let quantity = event.target.value
    this.setState({ quantity: quantity });
  }

  async addCart(_id, priority, quantity) {
    try {
      const response = await fetch("http://192.168.0.61:8020/cart/addtocart/" + _id, {
        method: "POST",
        body: JSON.stringify({
          priority: priority,
          qty: quantity,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
      })
      this.setState({ counter: this.state.counter + 1 })
      let data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

  }


  render() {
    const url = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';

    if (this.state.loading) {
      return <div>
        <div className="logo">
          <img src={url} />
        </div>
        <div className="state">loading...</div>
      </div>
    }

    if (!this.state.people.length) {
      return <div className="state">didn't get Menu</div>;
    }




    return (
      <div >
        <UserNav />
        <div className="cart-counter">
          <span className="counter">{this.state.counter}</span>
        </div>
        <div className="Allpage">
          <div className="flex1">
            <div className="List">
              <h1 className="titles">Category List</h1>
            </div>
            <div className="card">
              {this.state.people.map(person => (
                <div key={person._id}>
                  <div className="cardItem" onClick={() => this.handleClick(person._id)}>
                    <div className="content">
                      <div className="FoNt">{person.categoryName}</div>
                      <div className="FoNt">{person.name}</div>
                      <div className="FoNt">{person.description}</div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex2">
            <div className="List">
              <h1 className="titles">Menu List</h1>
            </div>
            <div className="card1" >
              {this.state.carts.map(person => (
                <div key={person._id}>
                  <div className="CategoryName">{person.categoryName}</div>
                  <div className="cardItem1">
                    <div classname="image" >
                      <img src={person.imageUrl} />
                    </div>
                    <div className="content">
                      <div className="Font1">Name:- {person.name}</div>
                      <div className="price">
                        <div className="Font1">price:- {person.originalPrice} ₹ </div>
                      </div>
                      <div className="Font1">Description:- {person.description}</div>
                      <div >
                        <input className="priority" type="number" priority="priority" placeholder="priority" onChange={(e) => this.handlepriority(e)} />
                        <input className="priority" type="number" quantity="quantity" placeholder="quantity" onChange={(e) => this.handlequantity(e)} />
                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity)}>Add to Cart</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>);
  }
}

export default Menu;



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
import React, { Component } from 'react'
import './MenuList.css';
import Button from '@material-ui/core/Button';
import CookSidesection from './Cook-sidesection';
import { Link, useHistory } from 'react-router-dom';

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      carts: [],
      cart: [],
      cartItem: [],
    };

  }
  async componentDidMount() {
    const url = "http://localhost:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts });
    this.menuitem();

    this.getcart();
  }

  async getcart() {
    try {
      const url = "http://localhost:8020/cart/getcart";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
      });
      const data = await response.json();
      this.setState({ cartItem: data.Your_Cart.items, subTotal: data.Your_Cart.subTotal });
      this.searchArray = data
    } catch (err) {
    }
  }

  async unavailable(_id) {
    try {
      alert("Are You Sure this item is an unavilable !")
      const response = await fetch("http://localhost:8020/menu/itemunavailable/" + _id, {
        method: "PUT",
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

  async handleClick(_id) {
    const url = "http://localhost:8020/menu/menu/" + _id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ carts: data.products, loading: false, });
    this.searchArray = data;
  }

  async menuitem() {
    const url = "http://localhost:8020/menu/menues";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cart: data.products });
    this.searchArray = data
  }
 
  render() {
    if (this.state.loading) {
      return <div>
        <CookSidesection />

        <div className="Allpage">

          <div className="flex1">
            <div className="Lists">
              <h1 className="titles">Category List</h1>
            </div>
            <div className="category-card">
              {this.state.people.map(person => (
                <div key={person._id}>
                  <div className="cardItems" onClick={() => this.handleClick(person._id)}>
                    <div className="content-data">
                      <div className="category-content">{person.categoryName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="flex2">
            <div className="Lists">
              <h1 className="titles">Menu List</h1>
            </div>
            {this.state.people.map(person => (
              <div key={person._id}>
                <div className="category_head_set">
                  <h2 className="category_titles">➤ {person.categoryName}</h2>
                </div>
                <div className="card-menus" >
                  {person.products.map(data => (
                    <div key={data._id}>
                      <div className="cardItem-menus">
                        <div classname="image" >
                          <img width="230px" height="230px" src={data.imageUrl}/>
                        </div>
                        <div className="content-data">
                          <div className="menu-data">{data.name}</div>
                          <div className="menu-description">Description :- {data.description}</div>
                          <div className="price">
                            <div className="menu-price">price :- {data.originalPrice} ₹ </div>
                          </div>
                          <div className="add-cartBtn_set">
                          <button className="btn-unavailable" onClick={() => this.unavailable(data._id)}>Set Unavilable</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    }

    if (!this.state.people.length) {
      return <div className="state">didn't get Menu</div>;
    }

    return (
      <div>
        <CookSidesection />

        <div className="Allpage">
          <div className="flex1">
            <div className="Lists">
              <h1 className="titles">Category List</h1>
            </div>
            <div className="category-card">
              {this.state.people.map(person => (
                <div key={person._id}>
                  <div className="cardItems" onClick={() => this.handleClick(person._id)}>
                    <div className="content-data">
                      <div className="category-content">{person.categoryName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <select className="select" value={this.state.value} onChange={this.handleChange}>

              {this.state.people.map(person => (
                <option value={person.categoryName}>{person.categoryName}</option>
              ))}
            </select> */}
          </div>

          <div className="flex2">
            <div className="Lists">
              <h1 className="titles">Menu List </h1>
            </div>
            <div className="category_head_set">
              <h2 className="category_titles">➤ Indian</h2>
            </div>
            <div className="card-menus" >
              {this.state.carts.map(person => (
                <div key={person._id}>
                  <div className="cardItem-menus">
                    <div classname="image" >
                      <img width="230px" height="230px" src={person.imageUrl} />
                    </div>
                    <div className="content-data">
                      <div className="menu-data">{person.name}</div>
                      <div className="menu-description">Description :- {person.description}</div>
                      <div className="price">
                        <div className="menu-price">price :- {person.originalPrice} ₹ </div>
                      </div>
                      <div className="add-cartBtn_set">
                      <button className="btn-unavailable" onClick={() => this.unavailable(person._id)}>Set Unavilable</button>
                        
                      </div>
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

export default MenuList;


import React, { Component } from 'react'
import './MenuList.css';
import Button from '@material-ui/core/Button';
import CookSidesection from './Cook-sidesection';

export class MenuList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          people: [],
          carts: [],
          counter: 0,
          count: 0,
          priority: 1,
          quantity: 1
        };
      }

      async componentDidMount() {
        const url = "http://localhost:8020/categorypost/categories";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.categoryposts, loading: false });
      }
    
       async handleClick(_id) {
        const url = "http://localhost:8020/menu/menu/" + _id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ carts: data.products, });
        this.searchArray = data 
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

    render() {
        const url = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif';

    if (this.state.loading) {
      return <div>
        <div className="logo">
          <img height="100px" width="100px" src={url} />
        </div>
        <div className="state">loading...</div>
      </div>
    }

    if (!this.state.people.length) {
      return <div className="state">didn't get Menu</div>;
    }

        return (
            <div>
                <CookSidesection />
                
        <div className="Allpage-cook">
          <div className="cook-flex1">
            <div className="List-head">
              <h1 className="titles">Category List</h1>
            </div>
            <div className="cook-card">
              {this.state.people.map(person => (
                <div key={person._id}>
                  <div className="cook-cardItem" onClick={() => this.handleClick(person._id)}>
                    <div className="cook-content">
                      <div className="FoNt">{person.categoryName}</div>
                      <div className="FoNt">{person.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cook-flex2">
            <div className="List-head">
              <h1 className="titles">Menu List</h1>
            </div>
            <div className="cook-card1" >
              {this.state.carts.map(person => (
                <div key={person._id}>
                  <div className="CategoryName">{person.categoryName}</div>
                  <div className="cook-cardItem1">
                    <div classname="image">
                      <img width="200px" height="200px" src={person.imageUrl} />
                    </div>
                    <div className="content">
                      <div className="Font1">Name:- {person.name}</div>
                      <div className="price">
                        <div className="Font1">price:- {person.originalPrice} ₹ </div>
                      </div>
                      <div className="Font1">Description:- {person.description}</div>
                      <button className="btn-unavailable" onClick={() => this.unavailable(person._id)}>Set Unavilable</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
            </div>
        )
    }
}

export default MenuList;

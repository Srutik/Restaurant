import React from "react";
import './MenuList.css';
import CookSidesection from './Cook-sidesection';


class MenuList extends React.Component {
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

  async addCart(_id, priority, quantity) {
    try {
      const response = await fetch("http://localhost:8020/cart/addtocart/" + _id, {
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
      this.setState({ counter: this.state.counter + 1 , priority:1 , quantity:1})
      let data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

  }

  incrementCount(){
    this.setState({
      priority: this.state.priority + 1
    });
  } 

  DecrementCount() {
  	this.setState({
  		priority: this.state.priority - 1
  	});
  }


  incrementQTY(){
    this.setState({
      quantity: this.state.quantity + 1
    });
  } 

  DecrementQTY() {
  	this.setState({
  		quantity: this.state.quantity - 1
  	});
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
                      <img width="200px" height="200px" src={person.imageUrl} />
                    </div>
                    <div className="content">
                      <div className="Font1">Name:- {person.name}</div>
                      <div className="price">
                        <div className="Font1">price:- {person.originalPrice} ₹ </div>
                      </div>
                      <div className="Font1">Description:- {person.description}</div>
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

export default MenuList;
import React from "react";
import './MenuList.css';

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      cart: [],
      counter: 0,
      priority: 1,
      quantity: 1
    };
    this.incrementCount = this.incrementCount.bind(this);
    this.DecrementCount = this.DecrementCount.bind(this);
    this.incrementQTY = this.incrementQTY.bind(this);
    this.DecrementQTY = this.DecrementQTY.bind(this)

  }
  async componentDidMount() {

    const url = "http://localhost:8020/menu/menues";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cart: data.products, loading: false });
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
      this.setState({ counter: this.state.counter + 1, priority: 1, quantity: 1 })
      let data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

  }

  incrementCount() {
    this.setState({
      priority: this.state.priority + 1
    });
  }

  DecrementCount() {
    this.setState({
      priority: this.state.priority - 1
    });
  }


  incrementQTY() {
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

    return (
      <div className="All-menu">
        <div className="flex2">
          <div className="Lists">
            <h1 className="titles">Menu List</h1>
          </div>
          <div className="card-menus" >
            {this.state.cart.map(person => (
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
                    <div >
                      <div className="priority-set">
                        <button type="button" className="priority-btn" onClick={this.incrementCount}>+</button>
                        <div classNam="p-data">Priority : {this.state.priority}</div>
                        <button type="button" className="priority-btn" onClick={this.DecrementCount}>-</button>
                      </div>

                      <div className="Quantity-set">
                        <button type="button" className="Quantity-btn" onClick={this.incrementQTY}>+</button>
                        <div className="q-data">Quantity : {this.state.quantity}</div>
                        <button type="button" className="Quantity-btn" onClick={this.DecrementQTY}>-</button>
                      </div>

                    </div>
                    <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity)}>Add to Cart</button>
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

export default MenuList;





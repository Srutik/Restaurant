import React from "react";
import './Menu.css';
import Cart from './Cart';
import MenuList from './MenuList';
import { Link, useHistory } from 'react-router-dom';
import UserNav from './User-Nav';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      carts: [],
      cart: [],
      counter: 0,
      count: 0,
      priority: 1,
      quantity: 1,
      name: '',
      category: '',
      index: 0,
      categoryname: '',
      cartItem: []
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.DecrementCount = this.DecrementCount.bind(this);
    this.incrementQTY = this.incrementQTY.bind(this);
    this.DecrementQTY = this.DecrementQTY.bind(this)

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


  async menuitem() {
    const url = "http://localhost:8020/menu/menues";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cart: data.products });
    this.searchArray = data
  }

  async handleClick(_id) {
    const url = "http://localhost:8020/menu/menu/" + _id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ carts: data.products, loading: false, });
    this.searchArray = data;
  }

  async addCart(_id, priority, quantity, name) {
    try {
      const response = await fetch("http://localhost:8020/cart/addtocart/" + _id, {
        method: "POST",
        body: JSON.stringify({
          priority: priority,
          qty: quantity,
          notes: name
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
      })
      this.setState({ counter: this.state.counter + 1, priority: 1, quantity: 1 })
      this.setState({ index: this.state.index + 1 })
      this.getcart();
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
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

  handleName(e) {
    let name = e.target.value
    this.setState({ name: name })
  }


  render() {
    if (this.state.loading) {
      return <div>
        <UserNav index=
          {this.state.index} />

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
                      <div className="category-content">{person.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <select className="select" value={this.state.value} onChange={this.handleChange}>

              {this.state.people.map(person => (
                <div key={person._id}>
                  <option className="category-content" value={person.categoryName}>{person.categoryName}</option>
                  <div className="category-content">{person.name}</div>
                </div>
              ))}
            </select> */}
          </div>


          <div className="flex2">
            <div className="Lists">
              <h1 className="titles">Menu List</h1>
            </div>
            <div className="category_head_set">
              <h2 className="category_titles">➤ Chinese</h2>
            </div>
            <div className="card-menus" >
              {this.state.cart.filter(person => person.categoryId._id === "609a0d0d23025806dc494525").map(person => (
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

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />
                        </div>

                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.name)}>Add to Cart</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="category_head_set">
              <h2 className="category_titles">➤ Italian</h2>
            </div>
            <div className="card-menus" >
              {this.state.cart.filter(person => person.categoryId._id === "609a0d2123025806dc494526").map(person => (
                <div key={person._id}>
                  <div className="cardItem-menus">
                    <div classname="image">
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

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />
                        </div>

                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.name)}>Add to Cart</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="category_head_set">
              <h2 className="category_titles">➤ South-Indian</h2>
            </div>
            <div className="card-menus" >
              {this.state.cart.filter(person => person.categoryId._id === "609a0d3323025806dc494527").map(person => (
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

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />
                        </div>

                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.name)}>Add to Cart</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <div className="category_head_set">
              <h2 className="category_titles">➤ Cold-Drinks</h2>
            </div>
            <div className="card-menus" >
              {this.state.cart.filter(person => person.categoryId._id === "609a0d4423025806dc494528").map(person => (
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

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />
                        </div>

                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.name)}>Add to Cart</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex3">
            <div className="Lists">
              <h1 className="titles">Cart</h1>
              <div className="Side-cart">
                {this.state.cartItem.map(item => (
                  <div key={item._id}>
                    <div className="cartItemAdd">
                      <div classname="cart-images">
                        <img height="50px" width="50px" src={item.product_id.imageUrl} />
                        </div>
                        <div className="fontS">{item.product_id.name}</div>
                        <div className="fontS">{item.productPrice} ₹ 🗙 {item.qty}</div>
                      <div className="fontS-total">{item.total} ₹ </div>
                    </div>
                      {/* <div className="fontS">Priority:{item.priority}</div> */}
                      <div className="itemdata-set">
                      
                    </div>
                  </div>
                ))}
                <div className="btn-set">
                  <Link to="/cart" >
                  <button className="checkout_btn"> Checkout ➜ </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <MenuList /> */}
        </div>

      </div>
    }

    if (!this.state.people.length) {
      return <div className="state">didn't get Menu</div>;
    }

    return (
      <div>
        <UserNav />

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
                      {/* <div className="category-content">{person.name}</div> */}
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

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleName(e)} />
                        </div>

                      </div>
                      <div className="add-cartBtn_set">
                        <button className="addCart" onClick={this.togglePopup.bind(this)}>Add Ingredients</button>
                        {this.state.showPopup ?
                          <Popup
                            text='Close Me'
                            closePopup={this.togglePopup.bind(this)}
                          />
                          : null
                        }
                        <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.name)}>Add to Cart</button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex3">
            <div className="Lists">
              <h1 className="titles">Cart</h1>
              <div className="Side-cart">
                {this.state.cartItem.map(item => (
                  <div key={item._id}>
                    <div className="cartItemAdd">
                      <div classname="cart-images">
                        <img height="50px" width="50px" src={item.product_id.imageUrl} />
                        </div>
                        <div className="fontS">{item.product_id.name}</div>
                        <div className="fontS">{item.productPrice} ₹ 🗙 {item.qty}</div>
                      <div className="fontS-total">{item.total} ₹ </div>
                    </div>
                      {/* <div className="fontS">Priority:{item.priority}</div> */}
                      <div className="itemdata-set">
                      
                    </div>
                  </div>
                ))}
                <div className="btn-set">
                  <button className="checkout_btn">Checkout ➜</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>);
  }
}

export default Menu;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      Ingredients: [],
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8020/ingredients/getIngredients";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ Ingredients: data.ingredients, loading: false });
    this.searchArray = data;
  }

  // async handleSubmit(name) {
  //     try {
  //         const response = await fetch("http://localhost:8020/order/makeorder", {
  //             method: "PUT",
  //             body: JSON.stringify({
  //                 name: name,
  //             }),
  //             headers: {
  //                 "Content-type": "application/json; charset=UTF-8",
  //                 Authorization: `Bearer ` + localStorage.getItem("token")
  //             },
  //         })
  //         let data = await response.json()
  //         alert("Your Order is Submit !")
  //         console.log(data)
  //         window.location.reload(false)
  //     } catch (err) {
  //         console.log(err)
  //     }

  // }

  // handleName(e) {
  //     let name = e.target.value
  //     this.setState({ name: name })
  // }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="close-set">
            <button className="close-btn" onClick={this.props.closePopup}>X</button>
          </div>
          <div>
            <label className="itn"> Ingredients</label>

            <div>
              <table className="ai">
                <td>Title</td>
                <td>Image</td>
                <td>Price</td>
                <td>Description</td>
                <td>Action</td>
              </table>

              {this.state.Ingredients.map((data) => (
                <div key={data._id}>
                  <div>
                    <div>
                      <table className="ai1">
                        <tr>
                          <td> {data.IngredientName}</td>
                          <td>
                            <img
                              height="80px"
                              width="80px"
                              className="img"
                              src={data.imageUrl}
                            />
                          </td>

                          <td>{data.price} ₹</td>
                          <td>{data.description}</td>

                          <td>

                            {/* <button
                              className="eitb eitb1"
                              onClick={() => this.delete(data._id)}
                              variant="danger"
                            >
                              Delete
                            </button> */}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    );
  }
}

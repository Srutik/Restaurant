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
      notes: '',
      category: '',
      index: 0,
      categoryname: '',
      cartItem: [],
      menu: [],
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.DecrementCount = this.DecrementCount.bind(this);
    this.incrementQTY = this.incrementQTY.bind(this);
    this.DecrementQTY = this.DecrementQTY.bind(this);
    this.togglePopup = this.togglePopup.bind(this);

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

  async addCart(_id, priority, quantity, notes) {
    try {
      const response = await fetch("http://localhost:8020/cart/addtocart/" + _id, {
        method: "POST",
        body: JSON.stringify({
          priority: priority,
          qty: quantity,
          notes: notes
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
      showPopup: !this.state.showPopup,
      // Title: data.name
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

  handleNote(e) {
    let notes = e.target.value
    this.setState({ notes: notes })
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
                      {/* <div className="category-content">{person.name}</div> */}
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
                          <img width="150px" height="150px" src={data.imageUrl}/>
                        </div>
                        <div className="content-data">
                          <div className="menu-data">{data.name}</div>
                          <div className="menu-description">Description :- {data.description}</div>
                          <div className="price">
                            <div className="menu-price">price :- {data.originalPrice} ₹ </div>
                          </div>
                          </div>
                          <div className="flex-second">
                            <div className="priority-set">
                              <button type="button" className="priority-btn" onClick={this.DecrementCount}>-</button>
                              <div classNam="p-data">Priority : {this.state.priority}</div>
                              <button type="button" className="priority-btn" onClick={this.incrementCount}>+</button>
                            </div>

                            <div className="Quantity-set">
                              <button type="button" className="Quantity-btn" onClick={this.DecrementQTY}>-</button>
                              <div className="q-data">Quantity : {this.state.quantity}</div>
                              <button type="button" className="Quantity-btn" onClick={this.incrementQTY}>+</button>
                            </div>

                            <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                            <div>
                              <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleNote(e)} />
                            </div>

                          </div>
                          <div className="add-cartBtn_set">
                            <button className="addCart" onClick={this.togglePopup.bind(data)}>Add Ingredients</button>
                            {this.state.showPopup ?
                              <Popup
                                title={this.state.Title}
                                text='Close Me'
                                closePopup={this.togglePopup.bind(this)}
                              />
                              : null
                            }
                            <button className="addCart" onClick={() => this.addCart(data._id, this.state.priority, this.state.quantity, this.state.notes)}>Add to Cart</button>
                          </div>
                       
                      </div>
                    </div>
                  ))}

                </div>
                
              </div>
            ))}
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
                      <div>
                        <div className="priority-set">
                          <button type="button" className="priority-btn" onClick={this.DecrementCount}>-</button>
                          <div classNam="p-data">Priority : {this.state.priority}</div>
                          <button type="button" className="priority-btn" onClick={this.incrementCount}>+</button>
                        </div>

                        <div className="Quantity-set">
                          <button type="button" className="Quantity-btn" onClick={this.DecrementQTY}>-</button>
                          <div className="q-data">Quantity : {this.state.quantity}</div>
                          <button type="button" className="Quantity-btn" onClick={this.incrementQTY}>+</button>
                        </div>

                        <div className="Order-Note" htmlFor="Order-Name">Add Notes</div>
                        <div>
                          <input className="input-notes" type="text" name="name" placeholder="Enter Order Note" onChange={(e) => this.handleNote(e)} />
                        </div>

                      </div>
                      <div className="add-cartBtn_set">
                        <button className="addCart" onClick={this.togglePopup.bind(person)}>Add Ingredients</button>
                        {this.state.showPopup ?
                          <Popup
                            title={this.state.Title}
                            text='Close Me'
                            closePopup={this.togglePopup.bind(this)}
                          />
                          : null
                        }
                        <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity, this.state.notes)}>Add to Cart</button>
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
                    <div className="itemdata-set">

                    </div>
                  </div>
                ))}
                <div className="btn-set">
                  <Link to='/cart'>
                    <button className="checkout_btn">Checkout ➜</button>
                  </Link>
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
      ingredients: [],
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8020/ingredients/getIngredients";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ ingredients: data.ingredients, loading: false });
    this.searchArray = data;
    console.log(this.props.title)
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
      <div className='popup-ingredient'>
        <div className='popup-ingredient_inner'>
          <div>
            <h1 className="Title-ingeredients">Ingredients</h1>
            {/* <h1>{this.props.title}</h1> */}

            {this.state.ingredients.map((person) => (
              <div key={person._id}>
                <div className="checkbox-menu">
                  <label>
                    <input type="checkbox" className="checkbox-size"
                      defaultChecked={this.state.isChecked}
                      onChange={this.toggleChange}
                    />
                    {person.IngredientName}
                  </label>
                  <div>
                    <div className="price-ingredient">{person.price} ₹</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="Ingredient_btn-set">
              <div className="close_btn">
                <button className="close-popup_ingredient">Add</button>
              </div>
              <div className="close_btn">
                <button className="close-popup_ingredient" onClick={this.props.closePopup}>Close</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

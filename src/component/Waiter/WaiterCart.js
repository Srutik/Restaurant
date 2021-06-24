import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Waiter-nav/Navbar";
import axios from "axios";

import "./Cart.scss";
import "./Pop-up.css";



class DeletePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleDelete() {
    fetch("http://localhost:8020/cart/emptycart", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
    }).then((data) => {
      data.json().then((response) => {
        window.location.reload(false);
      });
    });
  }

  render() {
    return (
      <div className="Deletepopup">
        <div className="Deletepopup_inner">
          <div className="cdpb">
            <button className="cdpb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <div>
            <div className="sdc">Are You Sure to Delete Cart !</div>
            <div className="order-btn">
              <button className="cart-button" onClick={this.handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TablePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      table: "",
      email:'',
    };
  }

  handleTable(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleEmail(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  handleBook(e) {
    let table = this.state.table;
    let email = this.state.email;
    let formdata = new FormData();

    formdata.append("table", table);
    formdata.append("email",email);

    axios({
      url: `http://localhost:8020/book/booktableforguest/` + this.props._id,
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },

      data: formdata,
    });
  }

  render() {
    return (
      <div className="pop-up">
        <div className="pop-up_inner">
          <div className="cdpb">
            <button className="cdpb1" onClick={this.props.closeTablePopup}>
              X
            </button>
          </div>

          <div>

          <label className="ctpn">Email</label>
            <div className="ctpn1">
              <input
                className="ctpn2"
                type="text"
                email="email"
                
                placeholder="Enter The Email"
                onChange={(e) => this.handleEmail(e)}
              />
            </div>

            <label className="ctpn">Table Number</label>
            <div className="ctpn1">
              <input
                className="ctpn2"
                type="number"
                table="table"
                min="1"
                placeholder="Enter Table Number"
                onChange={(e) => this.handleTable(e)}
              />
            </div>
            <div className="order-btn">
              <button className="cart-button" onClick={() => this.handleBook()}>
                Book Table
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ResPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Phone: "",
      name: "",
      persons: "",
      createdTable: "",
      message: "",
      loading: true,
      showTablePopup: false,
      id: null,
    };
  }

  toggleTablePopup() {
    this.setState({
      showTablePopup: !this.state.showTablePopup,
      id: this.state.createdTable._id,
    });
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handlPhone(e) {
    let phone = e.target.value;
    this.setState({ phone: phone });
  }

  handlePerson(e) {
    let persons = e.target.value;
    this.setState({ persons: persons });
  }

  handleSubmit(e) {
    let phone = this.state.phone;
    let name = this.state.name;
    let persons = this.state.persons;

    let formdata = new FormData();

    formdata.append("phone", phone);
    formdata.append("name", name);
    formdata.append("persons", persons);

    axios({
      url: `http://localhost:8020/book/waiterreservation`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { createdTable, message } = data;
        this.setState({ createdTable, message });
      });
  }

  render() {
    return (
      <div className="crp">
        <div className="crp1">
          <div className="cdpb">
            <button className="cdpb1" onClick={this.props.closeResPopup}>
              X
            </button>
          </div>

          <div>
            <div className="mon">Name</div>
            <div className="mon1">
              <input
                type="text"
                className="mon2"
                name="name"
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <div className="crpn">Phone Number</div>
            <div className="crpn1">
              <input
                type="text"
                className="crpn2"
                maxLength="10"
                name="Phone"
                onChange={(e) => this.handlPhone(e)}
              />
            </div>

            <div className="crpn">Person</div>
            <div className="crpn1">
              <input
                type="number"
                className="crpn2"
                min="1"
                name="person"
                onChange={(e) => this.handlePerson(e)}
              />
            </div>

            <div className="cresb">
              <button className="cresb1" onClick={(e) => this.handleSubmit(e)}>
                Reservation
              </button>
            </div>
            <div className="crm">{this.state.message}</div>
          </div>

          <div className="crt">
            <label className="resd">Reservation Details</label>
            <table className="crd">
              <td>UserName</td>
              <td>Phone Number</td>
              <td>Person</td>
            </table>

            <table className="crd1" onClick={this.toggleTablePopup.bind(this)}>
              <td>{this.state.createdTable.name}</td>
              <td>{this.state.createdTable.phone}</td>
              <td>{this.state.createdTable.persons}</td>
              


            </table>
            {this.state.showTablePopup ? (
              <TablePopup
                _id={this.state.id}
                closeTablePopup={this.toggleTablePopup.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}


class MakePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      phone: "",
      name:'',
    };
  }

  handlePhone(e) {
    let phone = e.target.value;
    this.setState({ phone:phone});
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name:name});
  }

  handleBook(e) {
    let phone = this.state.phone;
    let name = this.state.name;
    let formdata = new FormData();

    formdata.append("phone", phone);
    formdata.append("name",name);

    axios({
      url: `http://localhost:8020/order/waiter/makeorder`,
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },

      data: formdata,
    });
  }

  render() {
    return (
      <div className="pop-up">
        <div className="pop-up_inner">
          <div className="cdpb">
            <button className="cdpb1" onClick={this.props.closeMakePopup}>
              X
            </button>
          </div>

          <div>

          <label className="ctpn">Name</label>
            <div className="ctpn1">
              <input
                className="ctpn2"
                type="text"
                name="name"
                
                placeholder="Enter The Name"
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <label className="ctpn">phone Number</label>
            <div className="ctpn1">
              <input
                className="ctpn2"
                type="number"
                phone="phone"
                
                placeholder="Enter Phone number"
                onChange={(e) => this.handlephone(e)}
              />
            </div>
            <div className="order-btn">
              <button className="cart-button" onClick={() => this.handleBook()}>
                Make Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PopupParcel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: null,
    };
  }

  async handleParcel(name) {
    try {
      const response = await fetch(
        "http://localhost:8020/order/parcel/makeorder",
        {
          method: "PUT",
          body: JSON.stringify({
            name: name,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }
      );
      let data = await response.json();
      alert("Your Order is Submit !");
      console.log(data);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  render() {
    return (
      <div className="pop-up">
        <div className="pop-up_inner">
          <div className="cdpb">
            <button className="cdpb1" onClick={this.props.closeParcelPopup}>
              X
            </button>
          </div>

          <div>
            <label className="ctpn">Order Name</label>
            <div className="ctpn1">
              <input
                className="ctpn2"
                type="text"
                name="name"
                placeholder="Enter Order Note"
                onChange={(e) => this.handleName(e)}
              />
            </div>
            <div className="order-btn">
              <button
                className="cart-button"
                onClick={() => this.handleParcel(this.state.name)}
              >
                Parcel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cartItem: [],
      quantity: 0,
      subTotal: null,
      showMakepopup:false,
      showParcelPopup: false,
      showDeletePopup: false,
      showResPopup: false,
    };
  }

  toggleResPopup() {
    this.setState({
      showResPopup: !this.state.showResPopup,
    });
  }

  toggleMakePopup() {
    this.setState({
      showMakePopup: !this.state.showMakePopup,
    });
  }

  toggleParcelPopup() {
    this.setState({
      showParcelPopup: !this.state.showParcelPopup,
    });
  }

  toggleDeletePopup() {
    this.setState({
      showDeletePopup: !this.state.showDeletePopup,
    });
  }

  async componentDidMount() {
    try {
      const url = "http://localhost:8020/cart/getcart";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      this.setState({
        cartItem: data.Your_Cart.items,
        subTotal: data.Your_Cart.subTotal,
        loading: false,
      });
      this.searchArray = data;
    } catch (err) { }
  }

  async placeOrder() {
    try {
      const response = await fetch("http://localhost:8020/order/makeorder", {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      alert("Your Order is Submit !");
      console.log(data);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Navbar />
          <div className="empty-cart">
            <div className="transparent-cart">
              <div className="text-area">
                <div className="state">Opps ! Your Cart is Empty</div>
                <div className="state">Please Visit Our Menu First.</div>
              </div>
              <div className="emptycart_btn">
                <div className="buttons">
                  <Link to="/WaiterMenu">
                    <button className="cart-menu">Menu</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <div className="cartbox1">
          <div className="ListS">
            <h1 className="titleS">Cart</h1>
          </div>

          <div className="cartView">
            <table className="cit">
              <tr>
                <td>Name</td>
                <td>Priority</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </table>

            {this.state.cartItem.map((item) => (
              <div key={item._id}>
                <table className="cit1">
                  <tr>
                    <td>{item.product_id.name}</td>
                    <td>{item.priority}</td>
                    <td>{item.qty}</td>
                    <td>{item.productPrice.toFixed()}</td>
                    <td>{item.total.toFixed()}</td>
                  </tr>
                </table>
              </div>
            ))}
            <div className="Grand-Total">
              Grand Total = {this.state.subTotal.toFixed()} ₹
            </div>

            <div className="Buttons">
            <button
                className="cart-button"
                onClick={this.toggleMakePopup.bind(this)}
              >
                PlaceOrder 
              </button>

              {this.state.showMakePopup ? (
                <MakePopup
                  closeMakePopup={this.toggleMakePopup.bind(this)}
                />
              ) : null}

              <button
                className="cart-button"
                onClick={this.toggleResPopup.bind(this)}
              >
                Reservation
              </button>

              {this.state.showResPopup ? (
                <ResPopup
                  text="Close Me"
                  closeResPopup={this.toggleResPopup.bind(this)}
                />
              ) : null}

              <button
                className="cart-button"
                onClick={this.toggleDeletePopup.bind(this)}
              >
                Delete Cart
              </button>
              {this.state.showDeletePopup ? (
                <DeletePopup
                  text="Close Me"
                  closePopup={this.toggleDeletePopup.bind(this)}
                />
              ) : null}

              <button
                className="cart-button"
                onClick={this.toggleParcelPopup.bind(this)}
              >
                Parcel Order
              </button>
              {this.state.showParcelPopup ? (
                <PopupParcel
                  text="Close Me"
                  closeParcelPopup={this.toggleParcelPopup.bind(this)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
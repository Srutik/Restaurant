import React, { Component } from "react";
import "./CreateComplaints.scss";
import axios from "axios";
import Navbar from './Waiter-nav/Navbar';

export class CreateComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      id: null,
      showPopup: false,
      loading: true,
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/order/getorders";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.orders, loading: false });
    this.searchArray = data;
  }

  togglePopup(order) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: order._id,
    });
  }

  render() {
    return (
      <div>
       <Navbar/>

        <h1> Create Complaints </h1>
        <div>
         
              <table className="ccmt">
                <td>Name</td>
                <td>Table Number</td>
              </table>

              {this.state.people.map((order) => (
                <div key={order._id}>
                  <table
                    className="ccmt1"
                    onClick={() => this.togglePopup(order)}
                  >
                    <tr>
                      <td>{order.name}</td>

                      <td>{order.table}</td>
                    </tr>
                  </table>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(order)}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
     
    );
  }
}

export default CreateComplaints;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: "",
      message: "",
      phone: "",
    };
  }

  handlePhone(e) {
    let phone = e.target.value;
    this.setState({ phone: phone });
  }

  handleTitle(e) {
    let title = e.target.value;
    this.setState({ title: title });
  }

  handleMessage(e) {
    let message = e.target.value;
    this.setState({ message: message });
  }

  handleUpload(e) {
    let phone = this.state.phone;
    let title = this.state.title;
    let message = this.state.message;

    let formdata = new FormData();

    formdata.append("phone", phone);
    formdata.append("title", title);
    formdata.append("message", message);

    axios({
      url: `http://localhost:8020/complaint/waiter/complaint/` + this.props._id,
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { message } = data;
        this.setState({ message });
      });
  }

  render() {
    return (
      <div className="ccp">
        <div className="ccp1">
          <div className="ccpb">
            <button className="ccpb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <label className="ccpn">Complaints</label>

          <div className="pn">Phone Number</div>
          <div className="pn1">
            <input
              type="text"
              className="pn2"
              name="phone"
              maxLength="10"
              onChange={(e) => this.handlePhone(e)}
            />
          </div>

          <div className="cct">Title</div>
          <div className="cct1">
            <input
              type="text"
              className="cct2"
              name="title"
              onChange={(e) => this.handleTitle(e)}
            />
          </div>

          <div className="ccm">Message</div>
          <div className="ccm1">
            <input
              type="text"
              className="ccm2"
              name="message"
              onChange={(e) => this.handleMessage(e)}
            />
          </div>

          <div className="ccsb">
            <button className="ccsb1" onClick={(e) => this.handleUpload(e)}>
              Submit
            </button>
          </div>

          {/* <div>{this.state.message}</div> */}
        </div>
      </div>
    );
  }
}

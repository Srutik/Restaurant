import React, { Component } from "react";
import './View-waiter.css';
import Sidesection from './Sidesection';

class Popup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      name: "",
      email: "",
      phone: "",

    };
  }

  update(e) {
    e.preventDefault();

    fetch("http://localhost:8020/all/update/all/" + this.props._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleEmail(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  handlePhone(e) {
    let phone = e.target.value;
    this.setState({ phone: phone });
  }

  render() {
    return (
      <div className="popupwaiter">

        <div className="popupwaiter_inner">

          <label className="label-waiter">Edit Waiter Details</label>

            <div className="dtl">
            <div className="title-waiter">Name</div>
            <div className="text1-waiter">
              <input
                className="text2-waiter"
                type="text"
                name="name"
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <div className="email-waiter">Email</div>
            <div className="email1-waiter">
              <input
                className="email2-waiter"
                type="text"
                name="email"
               
                onChange={(e) => this.handleEmail(e)}
              />
            </div>

            <div className="phone-waiter">Phone</div>
            <div className="phone1-waiter">
              <input
                className="phone2-waiter"
                type="text"
                name="phone"
                onChange={(e) => this.handlePhone(e)}
              />
            </div>

            <div className="popbtn-waiter">
              <button className="popbtn1-waiter" onClick={(e) => this.update(e)}>
                Update
              </button>
            </div>

        <div className="popbtn2-waiter">
            <button className="pop-waiter" onClick={this.props.closePopup}>X</button>
            </div>
          </div>
          </div>
        </div>
    );
  }
}

class viewWaiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(cook) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: cook._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "Waiter",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    this.setState({ people: data.list, loading: false });
  }

  delete(_id) {
    fetch("http://localhost:8020/all/delete/" + _id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  render() {
    const url = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";

    if (this.state.loading) {
      return (
        <div>
          <div className="logo">
            <img height="100px" width="100px" src={url} />
          </div>
          <div className="state">loading...</div>
        </div>
      );
    }
    return (
      <div>
         <Sidesection />
        <h1 className="view-Data_waiter">All Waiter</h1>
        <div>
        <table className="waitert1">
         
         <td>Name</td>
         <td>Email</td>
         <td>Phone</td>
         <td>Date</td>
         <td>Action</td>
      
       </table>
          {this.state.people.map((cook) => (
            <div key={cook._id}>
              <div>
                <div>
                <table className="waitert">
                    <tr>
                      <td> {cook.name}</td>
                      <td> {cook.email}</td>
                      <td>{cook.phone}</td>
                      <td>{cook.created_At}</td>
                      <td>
                        <button className="s-b s-b1" onClick={() => this.togglePopup(cook)}>
                          Edit item
                        </button>

                        <button className="s-b s-b1"
                          onClick={() => this.delete(cook._id)}
                          variant="danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    </table>
                
                </div>

                {this.state.showPopup ? (
                  <Popup
                    _id={this.state.id}
                    closePopup={() => this.togglePopup(cook)}
                  />
                ) : null}
              </div>
            </div>
          ))}
        
        </div>
      </div>
    );
  }
}
export default viewWaiter;




/* 
import React, { Component } from 'react'
import './View-waiter.css';
import Sidesection from './Sidesection';
export class viewWaiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          waiter: [],
        };
      }

      async componentDidMount() {
        const url = "http://localhost:8020/all/get"
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                activerole:"Waiter"
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        });
        const data = await response.json();
        this.setState({ waiter: data.list, loading: false });
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
        return (
            <div>
                <Sidesection />
                <div className="head-waiter">All Waiter</div>
                <div className="waiter-data">
                {this.state.waiter.map(cook => (
                <div key={cook._id}>
                  <div >
                    <div className="Single-waiter">
                      <div className="waiter-info">UserId :- {cook._id}</div>
                      <div className="waiter-info">Name :- {cook.name}</div>
                      <div className="waiter-info">Email :- {cook.email}</div>
                      <div className="waiter-info">PhoneNo :- {cook.phone}</div>
                      <div className="waiter-info">Created At :- {cook.created_At}</div>
                    </div>
                    <div>__________________________________________________________________________________________________________________________</div>
                  </div>
                </div>
              ))}
                </div>
            </div>
        )
    }
}

export default viewWaiter; */
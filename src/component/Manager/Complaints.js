import React, { Component } from "react";
import './Complaints.css';
import Sidesection from './Sidesection';

class Popup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      discount: "",

    };
  }

  updateOrder(e) {
    e.preventDefault();

    fetch("http://localhost:8020/order/setdiscount/" + this.props._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        discount: this.state.discount,
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

  handleDiscount(e) {
    let discount = e.target.value;
    this.setState({ discount: discount });
  }

  render() {
    return (
      <div className="popup_complaints">

        <div className="popup_inner-complaints">

          <label className="label-discount">Set Discount</label>

            <div className="dtl">
            <div className="title-cook">Enter Discount Value</div>
            <div className="text1-cook">
              <input
                className="text2-cook"
                type="text"
                name="name"
                onChange={(e) => this.handleDiscount(e)}
              />
            </div>

            <div className="popbtn-update">
              <button className="popbtn1-update" onClick={(e) => this.updateOrder(e)}>
                Update
              </button>
            </div>

        <div className="popbtn2-complaints">
            <button className="pop-complaint" onClick={this.props.closePopup}>X</button>
            </div>
          </div>
          </div>
        </div>
    );
  }
}

class complaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      complaints: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(complaint) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: complaint.orderId._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/complaint/complaints";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ complaints: data.complaints, loading: false });
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

    if (!this.state.complaints.length) {
      return <div className="state">You not have any Complaints</div>;
    }

    return (
      <div>
         <Sidesection />
        <h1 className="view-Data">All Complaints</h1>
        <div>
        <table className="complaint-tables">
         
         <td>Title</td>
         <td>Complaint</td>
         <td>Date</td>
         <td>Action</td>
      
       </table>
          {this.state.complaints.map((complaint) => (
            <div key={complaint._id}>
              <div>
                <div>
                <table className="complaint-table">
                    <tr>
                      <td> {complaint.title}</td>
                      <td> {complaint.message}</td>
                      <td>{complaint.created_At}</td>
                      <td>
                        <div className='complaint-table_btn'>
                        <button className="sb sb1" onClick={() => this.togglePopup(complaint)}>
                          Discount
                        </button>
                        </div>
                      </td>
                    </tr>
                    </table>
                </div>

                {this.state.showPopup ? (
                  <Popup
                    _id={this.state.id}
                    closePopup={() => this.togglePopup(complaint)}
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
export default complaints;






/* 
import React, { Component } from 'react'
import Sidesection from './Sidesection';
import './Complaints.css';


export class Complaints extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          complaint: [],
        };
      }

      setOffer() {
        alert("ok");
      }



    async componentDidMount() {
        const url = "http://localhost:8020/complaint/complaints";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ complaint: data.complaints, loading: false });
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

    if (!this.state.complaint.length) {
      return <div className="state">didn't get Menu</div>;
    }
        return (
            <div>
                <Sidesection />
                <h1 className="complain-label">Complaints</h1>

                <div className="complaint-data">
                {this.state.complaint.map(key => (
                <div key={key._id}>
                  <div >
                    <div className="Single-complaint">
                      <div className="complaint">UserId :- {key._id}</div>
                      <div className="complaint">Date :- {key.created_At}</div>
                      <div className="complaint">Title :- {key.title}</div>
                      <div className="main-complaint">Complaint :- {key.message}</div>
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
            </div>
        )
    }
}

export default Complaints; */


/*

<div className="complaint">Name :- {key.orderId.name}</div>

{key.orderId.items.map((suborder) =>
  <div key={suborder._id}>
      <div className="cooksingle-orderDone">
          <div classname="cookcart-images">
              <img height="100px" width="100px" src={suborder.productId.imageUrl} />
          </div>
          <div className="cookorder-data">Quantity:{suborder.qty}</div>
          <div className="cookorder-data">Priority:{suborder.priority}</div>
          <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
          <div className="cookorder-total">Grand Total:{suborder.total} ₹ </div>
      </div>
  </div>)} */
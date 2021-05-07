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

export default Complaints;


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
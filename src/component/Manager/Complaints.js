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
                      <div className="complaint">Title :- {key.title}</div>
                      <div className="main-complaint">Complaint :- {key.message}</div>
                      <div className="complaint">ProductId :- {key.productId}</div>
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
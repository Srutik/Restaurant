import React, { Component } from 'react'
import './View-cook.css';
import Sidesection from './Sidesection';
export class viewCook extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          people: [],
        };
      }

      async componentDidMount() {
        const url = "http://localhost:8020/all/get"
        const response = await fetch(url,{
            method: "POST",
            body: JSON.stringify({
                activerole:"cook"
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
        });
        const data = await response.json();
        this.setState({ people: data.list, loading: false });
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
                <div className="head-cook">All Cook</div>
                <div className="feedback-data">
                {this.state.people.map(cook => (
                <div key={cook._id}>
                  <div >
                    <div className="Single-feedback">
                      <div className="black">UserId :- {cook._id}</div>
                      <div className="black">Name :- {cook.name}</div>
                      <div className="black">Email :- {cook.email}</div>
                      <div className="black">PhoneNo :- {cook.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
            </div>
        )
    }
}

export default viewCook;
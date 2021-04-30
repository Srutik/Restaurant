import React, { Component } from 'react'
import Sidesection from './Sidesection';
import './review.css';


export class offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          feedback: [],
        };
      }

      async componentDidMount() {
        const url = "http://localhost:8020/feedback/feedbacks";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ feedback: data.feedbacks, loading: false });
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
                <h1 className="review-label">Reviews</h1>
                <div className="feedback-data">
                {this.state.feedback.map(key => (
                <div key={key._id}>
                  <div >
                    <div className="Single-feedback">
                      <div className="review">UserId :- {key._id}</div>
                      <div className="review">Title :- {key.title}</div>
                      <div className="review">Messages :- {key.message}</div>
                      <div className="review">Rating :- {key.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
            </div>
        )
    }
}

export default offers;

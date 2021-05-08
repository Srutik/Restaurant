import React, { Component } from 'react'
import Sidesection from './Sidesection';
import './review.css';

class reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      feedback: [],
      showPopup: false,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/feedback/feedbacks";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ feedback: data.feedbacks, loading: false });
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
        <h1 className="view-Data">All Reviews</h1>
        <div>
        <table className="wt1">

         <td>User</td>
         <td>Title</td>
         <td>Message</td>
         <td>Rating</td>
         <td>Date</td>
         
      
       </table>
          {this.state.feedback.map((key) => (
            <div key={key._id}>
              <div>
                <div>
                <table className="wt">
                    <tr>
                      <td> {key._id}</td>
                      <td> {key.title}</td>
                      <td> {key.message}</td>
                      <td>{key.rating}</td>
                      <td>{key.created_At}</td>
                    </tr>
                    </table>
                
                </div>
              </div>
            </div>
          ))}
        
        </div>
      </div>
    );
  }
}
export default reviews;




/* 
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
                      <div className="review">Date :- {key.created_At}</div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
            </div>
        )
    }
}

export default offers; */

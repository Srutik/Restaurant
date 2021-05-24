import React, { Component } from 'react'
import './User-Profile.css';
import Profile from './user-shape.png';
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';

class FeedbackPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      title: null,
      rating: null,
    }
  }


  async handleFeedback(title, description, rating) {
    try {
      const response = await fetch("http://localhost:8020/feedback/feedback", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          rating: rating,
          message: description
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ` + localStorage.getItem("token")
        },
      })
      let data = await response.json()
      alert("Your Feedback is Submit !")
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  handleTitle(e) {
    let title = e.target.value
    this.setState({ title: title })
  }

  handleDescription(e) {
    let description = e.target.value
    this.setState({ description: description })
  }

  ratingChanged = (newRating) => {
    this.setState({ rating: null })
    this.setState({ rating: newRating })
    console.log(newRating);
  };


  render() {
    const { rating } = this.state;

    return (

      <div className='Feedbackpopup'>
        <div className='Feedbackpopup_inner'>
          <h1>{this.props.text}</h1>
          <div className="close-set">
            <button className="close-btn" onClick={this.props.closePopup}>X</button>
          </div>

          <div>
            <div className="form-group">
              <label htmlFor="Order-Name">Title</label>
              <div>
                <input className="input" type="text" name="title" placeholder="Enter Feedback Title" onChange={(e) => this.handleTitle(e)} />
              </div>
              <label htmlFor="Order-Name">Description</label>
              <div>
                <textarea className="input" type="text" name="description" placeholder="Enter Description" onChange={(e) => this.handleDescription(e)} />
              </div>
              <label htmlFor="Order-Name">Rating</label>
              <div >

                <ReactStars
                  count={5}
                  onChange={this.ratingChanged.bind(this)}
                  size={30}
                  emptyIcon={<i className="far fa-star"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />

              </div>
              <div className="order-btn">
                <button className="feedback-button" onClick={() => this.handleFeedback(this.state.title, this.state.description, this.state.rating)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

class Usersection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      showFeedbackPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  toggleFeedbackPopup() {
    this.setState({
      showFeedbackPopup: !this.state.showFeedbackPopup
    });
  }

  render() {
    return (
      <div>
        <div className="Profile_section">
                    <div className="Profile-title">Hello ! </div>
                    <div className="Profile-data">Manager Your Profile !</div>
                    <div className="Profile-img" >
                        <img height="200px" width="200px" src={Profile} />
                    </div>
                </div>
                <div className="profile-flex">
                <div className="activity-section">
                <div className="activity-data">
                    <div className="activity-type">Activity</div>
                </div>

          <div className="btn-section">
            <button className="offer-button" onClick={this.toggleFeedbackPopup.bind(this)} >Feedback</button>
            {this.state.showFeedbackPopup ?
              <FeedbackPopup
                text='Close Me'
                closePopup={this.toggleFeedbackPopup.bind(this)}
              />
              : null
            }
          </div>

          <div className="btn-section">
            <Link to='/orderslist'>
            <button className="offer-button" >Order History</button>
            </Link>
          </div>

          <div className="btn-section">
            <Link >
            <button className="offer-button" >View Complaint</button>
            </Link>
          </div>

          <div className="btn-section">
            <Link to='/'>
            <button className="offer-button" >Sign Out</button>
            </Link>
          </div>
          </div>

            <div></div>

          </div>
      </div>
    )
  }
}

export default Usersection;


/* 

<button className="offer-button" onClick={this.togglePopup.bind(this)} >See Offers</button>
{this.state.showPopup ?
  <Popup
    text='Close Me'
    closePopup={this.togglePopup.bind(this)}
  />
  : null
}


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    }
  }

  render() {
    return (
      <div className='popup-offer'>
        <div className='popup-offer_inner'>
          <h1>{this.props.text}</h1>
          <div className="closeoffer-set">
            <button className="closeoffer-btn" onClick={this.props.closePopup}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

 */

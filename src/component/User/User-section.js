import React, { Component } from 'react'
import '../User/User-Section.css'

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

class Usersection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <div className='hero'>
          <h1>--- Welcome To ---</h1>
          <p> Dine Fine </p>
          <div className="btn-section">
            <button className="offer-button" onClick={this.togglePopup.bind(this)} >See Offers</button>
            {this.state.showPopup ?
              <Popup
                text='Close Me'
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Usersection;

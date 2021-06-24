import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './popup.css';

 class Popup extends Component {
    constructor(props){
        super(props)
        this.state = { value: "Select", 
                       phoneNo:"null",
                       Name:"null",
                       startDate: new Date(),
                      };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleBook() {
alert("Your Detail is Saved!")
    }

      handleSubmit(date) {
        this.setState({
          startDate: date
        })
      }
    
      onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
      }

    
    render() {
        return (
            <div className="popup-box">
            <div className="box">
            <button className="close-icon" onClick={this.props.handleClose.bind(this)}>x</button>
            <div>
              <input className="input" type="text" Name="Name"  placeholder="Name" onChange={this.handleChange}/>
            </div>
            <select className="select" value={this.state.value} onChange={this.handleChange}>
                    <option value="1 person">1 person</option>
                    <option value="2 person">2 person</option>
                    <option value="3 person">3 person</option>
                    <option value="4 person">4 person</option>
                    <option value="5 person">5 person</option>
                    <option value="6 person">6 person</option>
                    <option value="7 person">7 person</option>
                    <option value="8 person">8+ person</option>
          </select>
          <div className="text-center">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <DatePicker 
              className="picker"
                selected={this.state.startDate}
                onChange={this.handleSubmit}
                showTimeSelect
                name="startDate"
                timeIntervals={20}
                timeCaption="time"
                dateFormat="MMMM dd, yyyy h:mm aa"
              />
              <button className="Date" > Select </button>
            </div>

            <input className="input" maxLength="10" type="text" name="PhoneNo" placeholder="Phone no." onChange={this.handleChange} />
           
           <div>
            <button className="Date" onClick={this.handleBook} > Submit </button>
            </div>
            
          </form>

            </div>

            </div>
        </div>
        );
  };
}





 class OfferPage extends Component {
    render() {
        return (
            <div>
                {/* <UserNav /> */}
                <div className="Banner_section">
                    <div className="Banner-title">Best Offers For You</div>
                    <div className="Banner-data">Exclusive Deals On Your Food !</div>
                    <div className="Banner-img">
                        <img height="200px" width="200px"  />
                    </div>
                </div>
                <div className="offer-section">
                <div className="offer-link">
                    <div className="offer-type">Restaurant Offers</div>
                </div>
                </div>
            </div>
        )
    }
}


export default Popup
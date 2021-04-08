import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Pop-up.css';

 class Popup extends Component {
    constructor(props){
        super(props)
        this.state = { value: "Select",
        startDate: new Date(),
     };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

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
            <select className="select" value={this.state.value} onChange={this.handleChange}>
                    <option value="1 person">1 person</option>
                    <option value="2 person">2 person</option>
                    <option value="3 person">3 person</option>
                    <option value="4 person">4 person</option>
                    <option value="5 person">5 person</option>
                    <option value="6 person">6 person</option>
                    <option value="7 person">7 person</option>
                    <option value="8 person">8 person</option>
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
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <button className="Date" > Select </button>
            </div>
            
          </form>

            </div>

            </div>
        </div>
        );
  };
}

export default Popup



   
 





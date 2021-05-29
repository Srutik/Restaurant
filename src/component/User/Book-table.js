import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import UserNav from './User-Nav';
import "react-datepicker/dist/react-datepicker.css";

import './Book-table.css';

class BookTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "Select",
            phoneNo: "null",
            Name: "null",
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
            <div>
                <UserNav />
                <div>
                    <div className="booktable_title">Book Table</div>
                </div>
                <div className="add-table">
                    <div className="add-table1">
                        <div className="set_lable">
                            <label >Enter Your Name</label>
                        </div>
                        <div className="input_set">
                            <input className="input_field" type="text" Name="Name" placeholder="Name" onChange={this.handleChange} />
                        </div>

                        <div className="set_lable">
                        <label >Select Person</label>
                        </div>
                     
                        <div className="select_set">
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
                        </div>

                        <div className="set_lable">
                        <label >Select Date</label>
                        </div>
                        <div className="date_view">
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
                        </div>

                        <div className="set_lable">
                        <label >Enter Phone number</label>
                        </div>
                        <div className="phone_field">
                            <input className="input_field"  maxLength="10" type="text" name="PhoneNo" placeholder="Phone no." onChange={this.handleChange} />
                        </div>
                        <div className="submit_booktable">
                            <button className="handle_submit" onClick={this.handleBook} > Submit </button>
                        </div>


                    </div>
                </div>
            </div>
        );
    };
}

export default BookTable;










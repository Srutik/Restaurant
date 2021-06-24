import axios from "axios";
import Sidebar from "../Admin-sidebar/Sidebar";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Manager/RevenuePage.css";

class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: new Date(),
      enddate: new Date(),
      result: [],

      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEnd = this.handleSubmitEnd.bind(this);

  }

  handleSubmit(date) {
    this.setState({
      startdate: date
    })
  }

  // onFormSubmit(e) {
  //   e.preventDefault();
  //   console.log(this.state.startdate)
  // }

  handleSubmitEnd(date) {
    this.setState({
      enddate: date
    })
  }

  // onFormSubmitEnd(e) {
  //   e.preventDefault();
  //   console.log(this.state.enddate)
  // }


  // handleStartDate(e) {
  //   let startdate = e.target.value;
  //   this.setState({ startdate: startdate });
  // }

  // handleEndDate(e) {
  //   let enddate = e.target.value;
  //   this.setState({ enddate: enddate });
  // }

  handleUpload(e) {
    let startdate = this.state.startdate;
    let enddate = this.state.enddate;
    let formdata = new FormData();

    formdata.append("startdate", startdate);
    formdata.append("enddate", enddate);

    axios({
      url: `http://localhost:8020/revenue/revenuedates`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { result } = data;
        this.setState({ result });
      });
  }

  render() {
    const { id } = this.state;

    return (
      <div>
        <Sidebar />
        <h1>Revenue</h1>

        <div className="rn">
          <div className="rn1">
            <div className="rn2">
              <div className="sd">Start-Date</div>

              <div className="date_view-set">
                <DatePicker
                  className="picker"
                  selected={this.state.startdate}
                  onChange={this.handleSubmit}
                  showTimeSelect
                  name="startdate"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="ed">End-Date</div>

              <div className="date_view-set">
                <DatePicker
                  className="picker"
                  selected={this.state.enddate}
                  onChange={this.handleSubmitEnd}
                  showTimeSelect
                  name="enddate"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="rb">
                <button className="rb1" onClick={(e) => this.handleUpload(e)}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.result.map((item) => (
          <div key={item._id}>
            <div className="rnv">
              <div className="rnv1">
                <div className="rnv2">
                  <table className="rnt">
                    <td>Id</td>
                    <td>Count</td>
                    <td><div className="rns">Sum(Rs)</div></td>
                  </table>
                  <div>
                    <table className="rnt1">
                      <tr>
                        <td>{item._id}</td>

                        <td>{item.COUNT}</td>
                        <td><div className="rns">{item.SUM}</div></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Revenue;

import React, { Component } from "react";
import './View-cook.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Sidesection from './Sidesection';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';

class Popup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
    };
  }

  update(e) {
    e.preventDefault();
    fetch("http://localhost:8020/all/update/all/" + this.props._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleEmail(e) {
    let email = e.target.value;
    this.setState({ email: email });
  }

  handlePhone(e) {
    let phone = e.target.value;
    this.setState({ phone: phone });
  }

  render() {
    return (
      <div className="popupcook">

        <div className="popupcook_inner">

          <label className="label-cook">Edit Cook Details</label>

          <div className="dtl">
            <div className="title-cook">Name</div>
            <div className="text1-cook">
              <input
                className="text2-cook"
                type="text"
                value={this.state.name}
                onChange={(e) => this.handleName(e)}
              />
            </div>

            <div className="email-cook">Email</div>
            <div className="email1-cook">
              <input
                className="email2-cook"
                type="text"
                value={this.state.email}
                onChange={(e) => this.handleEmail(e)}
              />
            </div>

            <div className="phone-cook">Phone</div>
            <div className="phone1-cook">
              <input
                className="phone2-cook"
                type="text"
                value={this.state.phone}
                onChange={(e) => this.handlePhone(e)}
              />
            </div>

            <div className="popbtn-cook">
              <button className="popbtn1-cook" onClick={(e) => this.update(e)}>
                Update
              </button>
            </div>

            <div className="popbtn2-cook">
              <button className="pop-cook" onClick={this.props.closePopup}>X</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class viewCook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      people: [],
      showPopup: false,
      id2:"",
      name:"",
      email:"",
      phone:"",
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(cook) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: cook._id,
      name: cook.name,
      email: cook.email,
      phone: cook.phone
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "cook",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    this.setState({ people: data.list, loading: false });
  }

  delete() {
    fetch("http://localhost:8020/all/delete/" + this.state.id2, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        this.componentDidMount();
      });
    });
  }

  submit = (cook) => {
    this.setState({id2: cook._id})
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.delete()
        },
        {
          label: 'No',
        }
      ]
    })
  };

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
        <div className="view-Data">All Cook</div>
        <div>
          <table className="wt1">

            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Date</td>
            <td>Action</td>

          </table>
          {this.state.people.map((cook) => (
            <div key={cook._id}>
              <div>
                <div>
                  <table className="wt">
                    <tr>
                      <td> {cook.name}</td>
                      <td> {cook.email}</td>
                      <td>{cook.phone}</td>
                      <td>{cook.created_At}</td>
                      <td>
                        <IconButton aria-label="edit">
                          <EditIcon onClick={() => this.togglePopup(cook)} color="primary" fontSize="small" />
                        </IconButton>
                        
                        {/* <button className="sb sb1" onClick={() => this.togglePopup(cook)}>
                          Edit item
                        </button> */}

                        <IconButton aria-label="delete">
                          <DeleteIcon color="secondary" onClick={() => this.submit(cook)} fontSize="small"/>
                        </IconButton>
                      </td>
                    </tr>
                  </table>
                </div>

                {this.state.showPopup ? (
                  <Popup
                    name={this.state.name}
                    email={this.state.email}
                    phone={this.state.phone}
                    _id={this.state.id}
                    closePopup={() => this.togglePopup(cook)}
                  />
                ) : null}
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}
export default viewCook;
import React, { Component } from "react";
import './View-cook.css';
import axios from "axios";
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

          <label className="label-cook">Edit Waiter Details</label>

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

class viewWaiter extends Component {
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
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 5,
      currentPage: 0
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });
};

loadMoreData() {
  const data = this.state.orgtableData;
  
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
  this.setState({
    pageCount: Math.ceil(data.length / this.state.perPage),
    tableData:slice
  })

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
        activerole: "waiter",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    var slice = data.list.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({ pageCount: Math.ceil(data.list.length / this.state.perPage),
                    orgtableData :data.list,
                    loading: false,
                    tableData:slice
                })
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
        <div className="view-Data">All Waiter</div>
        <div>
          <table className="wt1">

            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Date</td>
            <td>Action</td>

          </table>
          {this.state.tableData.map((cook) => (
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
           <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

        </div>
      </div>
    );
  }
}
export default viewWaiter;
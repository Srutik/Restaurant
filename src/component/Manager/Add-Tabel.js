import React, { Component } from "react";
import axios from "axios";
import "./Add-Table.css";
import Sidesection from './Sidesection';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
      size: "",
    };
  }

  update(e) {
    let table = this.state.table;
    let size = this.state.size;

    let formdata = new FormData();

    formdata.append("table", table);
    formdata.append("size", size);

    axios({
      url: `http://localhost:8020/book/update/` + this.props._id,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {},
      (err) => {}
    );
  }

  handleTable1(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleSize1(e) {
    let size = e.target.value;
    this.setState({ size: size });
  }

  render() {
    return (
      <div className="t_popup">
        <div className="table_popup">
          <label className="label">Edit Details</label>

          <div className="tnu">Table-Number</div>
          <div className="tnu1">
            <input
              className="tnu2"
              type="number"
              name="table"
              onChange={(e) => this.handleTable1(e)}
            />
          </div>

          <div className="ts">Table-Size</div>
          <div className="ts1">
            <input
              className="ts2"
              type="number"
              name="size"
              onChange={(e) => this.handleSize1(e)}
            />
          </div>

          <div className="tub">
            <button className="tub1" onClick={(e) => this.update(e)}>
              Update
            </button>
          </div>

          <div className="table_cb">
            <button className="tcb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
      size: "",
      people: [],
      loading: true,
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: data._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/book/tables";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.tables, loading: false });
    this.searchArray = data;
  }

  handleTable(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleSize(e) {
    let size = e.target.value;
    this.setState({ size: size });
  }

  handleUpload(e) {
    let table = this.state.table;
    let size = this.state.size;

    let formdata = new FormData();

    formdata.append("table", table);
    formdata.append("size", size);

    axios({
      url: `http://localhost:8020/book/table`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.componentDidMount();
      },
      (err) => {}
    );
  }

  delete() {
    fetch("http://localhost:8020/book/delete/" + this.state.delete_id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        this.componentDidMount();
      });
    });
  }

  deletepopup = (table) => {
    this.setState({delete_id: table._id})
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
    return (
      <div>
          <Sidesection />
        <div>
          <h1 className="table_head">Add Table</h1>

          <div className="create_t">
            <div className="create_t1">
              <div className="create_t2">
                <div className="table_content">Table-Number</div>
                <div className="text1">
                  <input
                    type="number"
                    className="text2"
                    name="table"
                    onChange={(e) => this.handleTable(e)}
                  />
                </div>

                <div className="table_content">Table-Size</div>
                <div className="text1">
                  <input
                    type="number"
                    className="text2"
                    name="size"
                    onChange={(e) => this.handleSize(e)}
                  />
                </div>

                <div className="table_add-set">
                  <button
                    className="table_add"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="tn">Tables-Details</label>
          <div>
            <table className="tb">
              <td>Table-Number</td>
              <td>Person</td>
              <td>Action</td>
            </table>
            {this.state.people.map((table) => (
              <div key={table._id}>
                <div>
                  <div>
                    <table className="tb1">
                      <tr>
                        <td> {table.table}</td>
                        <td> {table.size}</td>
                        <td>

                        <IconButton aria-label="edit">
                              <EditIcon color="primary" fontSize="medium" onClick={() => this.togglePopup(table)} />
                            </IconButton>

                            <IconButton aria-label="delete">
                              <DeleteIcon color="secondary" fontSize="medium" onClick={() => this.deletepopup(table)}
 />
                            </IconButton>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(table)}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTable;
import React, { Component } from 'react'
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link } from 'react-router-dom';
import './Add-category.css';
import Sidesection from './Sidesection';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 



export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      categoryName: null,
      people: [],
      id: null,
      showPopup: false,
      activeOrderId: null,
      loading: true,
      imageUrl: "",
      C_id:null,
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.toggleEditPopup = this.toggleEditPopup.bind(this);

  }

  async componentDidMount() {
    const url = "http://localhost:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
    this.searchArray = data;
  }

  handleName(e) {
    let categoryName = e.target.value;
    this.setState({ categoryName: categoryName });
  }

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleUpload(e) {
    let file = this.state.file;
    let categoryName = this.state.categoryName;
    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("categoryName", categoryName);

    axios({
      url: `http://localhost:8020/categorypost/create`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.componentDidMount();
      },
      (err) => { }
    );
  }

  delete() {
    fetch("http://localhost:8020/categorypost/delete/" + this.state.delete_id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        this.componentDidMount();
      });
    });
  }

  deletepopup = (data) => {
    this.setState({delete_id: data._id})
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

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      activeId: data._id,
    });
  }

  toggleEditPopup(data) {
    this.setState({
      showEditPopup: !this.state.showEditPopup,
      C_id: data._id,
    });
  }

  render() {
    return (
      <div>
        <Sidesection />
        <div>
          <h1 className="Addcategory-title">Add Category</h1>

          <div className="add-c">
            <div className="add-c1">
              <div className="add-c2">
                <div className="category-title">Image</div>
                <div className="category-text1">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFile(e)}
                  />
                </div>

                <div className="category-title">Category-Name</div>
                <div className="category-text1">
                  <input
                    type="text"
                    className="category-text2"
                    name="categoryName"
                    onChange={(e) => this.handleName(e)}
                  />
                </div>

                <div className="upload-button1">
                  <button
                    className="upload-btn1"
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
          <label className="category-get-head">Categories</label>
          <div>
            <table className="add-ct">
              <td>Category-Name</td>
              <td>Image</td>
              <td>Action</td>
            </table>
            {this.state.people.map((data) => (
              <div key={data._id}>
                <div>
                  <div>
                    <table className="add-ct1">
                      <tr>
                        <td> {data.categoryName}</td>
                        <td>
                          <img
                            height="100px"
                            width="100px"
                            className="img"
                            src={data.imageUrl}
                          />
                        </td>
                        <td>
                          <div className="POPUP-set_button">

                            <IconButton aria-label="delete">
                              <AddBoxIcon color="primary" fontSize="large" onClick={() => this.togglePopup(data)} />
                            </IconButton>

                            <IconButton aria-label="edit">
                              <EditIcon color="primary" fontSize="large" onClick={() => this.toggleEditPopup(data)} />
                            </IconButton>

                            <IconButton aria-label="delete">
                              <DeleteIcon color="secondary" fontSize="large" onClick={() => this.deletepopup(data)} />
                            </IconButton>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.activeId}
                      text="Close Me"
                      closePopup={() => this.togglePopup(data)}
                    />
                  ) : null}


                  {this.state.showEditPopup ? (
                    <EditPopup
                      category_id={this.state.C_id}
                      text="Close Me"
                      closeEditPopup={() => this.toggleEditPopup(data)}
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

export default AddCategory;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      people: [],
      showSecondPopup: false,
      showThirdPopup: false,
      loading: true,
      imageUrl: "",
      originalPrice: "",
      description: "",
      offer: "",
      activeId1: null,
      activeId2: null,
    };
    // this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/menu/menu/" + this.props._id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
    this.searchArray = data;
  }

  handleItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleItemPrice(e) {
    let originalPrice = e.target.value;
    this.setState({ originalPrice: originalPrice });
  }

  handleItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  handleItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemUpload(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let originalPrice = this.state.originalPrice;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("name", name);
    formdata.append("originalPrice", originalPrice);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/menu/create/` + this.props._id,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.componentDidMount();
      },
      (err) => { }
    );
  }

  toggleSecondPopup(data) {
    this.setState({
      showSecondPopup: !this.state.showSecondPopup,
      activeId1: data._id,
    });
  }

  toggleThirdPopup(data) {
    this.setState({
      showThirdPopup: !this.state.showThirdPopup,
      activeId2: data._id
    });
  }

  delete(_id) {
    fetch("http://localhost:8020/menu/delete/" + this.state.delete_id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        this.componentDidMount();
      });
    });
  }

  deletepopup = (data) => {
    this.setState({delete_id: data._id})
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
      <div className="add-cp">
        <div className="add-cp1">
          <div className="closeItem-set">
            <button className="closeItem-btn" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <div>
            <label className="mn">Add Menu</label>
            <div>
              <div className="add-c">
                <div className="add-c1">
                  <div className="add-c2">
                    <div className="category-title">Image</div>
                    <div className="category-text1">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.handleItemFile(e)}
                      />
                    </div>

                    <div className="category-title">Sub-Title</div>
                    <div className="category-text1">
                      <input
                        className="category-text2"
                        type="text"
                        name="name"
                        onChange={(e) => this.handleItemName(e)}
                      />
                    </div>

                    <div className="category-title">Price (RS)</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="originalPrice"
                        min="1"
                        onChange={(e) => this.handleItemPrice(e)}
                      />
                    </div>

                    <div className="category-title">Offer</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="offer"
                        min="1"
                        onChange={(e) => this.handleItemOffer(e)}
                      />
                    </div>

                    <div className="category-title">Description</div>
                    <div className="dsc1">
                      <textarea
                        className="dsc2"
                        type="text"
                        name="description"
                        onChange={(e) => this.handleItemDescription(e)}
                      />
                    </div>

                    <div className="upload-button1">
                      <button
                        className="upload-btn1"
                        onClick={(e) => this.handleItemUpload(e)}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="ctn"> Menu</label>

            <div>
              <table className="am">
                <td>Title</td>
                <td>Image</td>
                <td>Price</td>
                <td>Offer</td>
                <td>OfferPrice</td>
                <td>Description</td>
                <td className="action-set">Action</td>
              </table>

              {this.state.people.map((data) => (
                <div key={data._id}>
                  <div>
                    <div>
                      <table className="am1">
                        <tr>
                          <td> {data.name}</td>
                          <td>
                            <img
                              height="80px"
                              width="80px"
                              className="img"
                              src={data.imageUrl}
                            />
                          </td>

                          <td>{data.originalPrice}</td>
                          <td>{data.offer}</td>
                          <td>{data.offerPrice}</td>
                          <td>{data.description}</td>

                          <td>
                            <div className="POPUP-set_button">
                              <IconButton aria-label="edit">
                                <EditIcon onClick={() => this.toggleSecondPopup(data)} color="primary" fontSize="small" />
                              </IconButton>

                              <IconButton aria-label="delete">
                                <DeleteIcon color="secondary" fontSize="small" onClick={() => this.deletepopup(data)} />
                              </IconButton>

                              <button
                                className="ectb ectb1"
                                onClick={() => this.toggleThirdPopup(data)}
                              >
                                Add Ingredients
                              </button>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {this.state.showSecondPopup ? (
                      <SecondPopup
                        id1={this.state.activeId1}
                        closeSecondPopup={() => this.toggleSecondPopup(data)}
                      />
                    ) : null}

                    {this.state.showThirdPopup ? (
                      <ThirdPopup
                        id2={this.state.activeId2}
                        closeThirdPopup={() => this.toggleThirdPopup(data)}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class EditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      loading: true,
    };
    // this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  EditItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  EditItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  // EditItemPrice(e) {
  //   let originalPrice = e.target.value;
  //   this.setState({ originalPrice: originalPrice });
  // }

  // EditItemOffer(e) {
  //   let offer = e.target.value;
  //   this.setState({ offer: offer });
  // }

  // EditItemDescription(e) {
  //   let description = e.target.value;
  //   this.setState({ description: description });
  // }

  async handleItemEditCategory(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    // let offer = this.state.offer;
    // let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("categoryName", name);
    // formdata.append("offer", offer);
    // formdata.append("description", description);

    axios({
      url: `http://localhost:8020/categorypost/update/` + this.props.category_id,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.submit()
      },
      (err) => { }
    );
  }

  submit = () => {
    confirmAlert({
      title: 'Set Message',
      message: 'Category is updated successfully !',
      buttons: [
        {
          label: 'ok',
          onClick: () => window.location.reload(false)
        }
      ]
    })
  };

  // toggleSecondPopup(data) {
  //   this.setState({
  //     showSecondPopup: !this.state.showSecondPopup,
  //     activeId1: data._id,
  //   });
  // }

  render() {
    return (
      <div className="add-cp">
        <div className="add-cp1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeEditPopup}
            >
              X
            </button>
          </div>
          <div>
            <label className="mn">Edit Category</label>
            <div>
              <div className="add-c">
                <div className="add-c1">
                  <div className="add-c2">
                    <div className="category-title">Image</div>
                    <div className="category-text1">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.EditItemFile(e)}
                      />
                    </div>

                    <div className="category-title">Title</div>
                    <div className="text1">
                      <input
                        className="text2"
                        type="text"
                        name="name"
                        onChange={(e) => this.EditItemName(e)}
                      />
                    </div>
{/* 
                    <div className="category-title">Price (RS)</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="originalPrice"
                        min="1"
                        onChange={(e) => this.EditItemPrice(e)}
                      />
                    </div>

                    <div className="category-title">Offer</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="offer"
                        min="1"
                        onChange={(e) => this.EditItemOffer(e)}
                      />
                    </div>

                    <div className="category-title">Description</div>
                    <div className="dsc1">
                      <textarea
                        className="dsc2"
                        type="text"
                        name="description"
                        onChange={(e) => this.EditItemDescription(e)}
                      />
                    </div> */}

                    <div className="upload-button1">
                      <button
                        className="upload-btn1"
                        onClick={(e) => this.handleItemEditCategory(e)}>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

class SecondPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      showSecondPopup: false,
      loading: true,
      imageUrl: "",
      originalPrice: "",
      description: "",
      offer: "",
      activeId1: null,
    };
    // this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  EditItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  EditItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  EditItemPrice(e) {
    let originalPrice = e.target.value;
    this.setState({ originalPrice: originalPrice });
  }

  EditItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  EditItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemEdit(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let offer = this.state.offer;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("name", name);
    formdata.append("offer", offer);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/menu/update/` + this.props.id1,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        // this.setState({ });
      },
      (err) => { }
    );
  }

  // toggleSecondPopup(data) {
  //   this.setState({
  //     showSecondPopup: !this.state.showSecondPopup,
  //     activeId1: data._id,
  //   });
  // }

  render() {
    return (
      <div className="add-cp">
        <div className="add-cp1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeSecondPopup}
            >
              X
            </button>
          </div>
          <div>
            <label className="mn">Edit Item</label>
            <div>
              <div className="add-c">
                <div className="add-c1">
                  <div className="add-c2">
                    <div className="category-title">Image</div>
                    <div className="category-text1">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.EditItemFile(e)}
                      />
                    </div>

                    <div className="category-title">Sub-Title</div>
                    <div className="text1">
                      <input
                        className="text2"
                        type="text"
                        name="name"
                        onChange={(e) => this.EditItemName(e)}
                      />
                    </div>

                    <div className="category-title">Price (RS)</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="originalPrice"
                        min="1"
                        onChange={(e) => this.EditItemPrice(e)}
                      />
                    </div>

                    <div className="category-title">Offer</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="offer"
                        min="1"
                        onChange={(e) => this.EditItemOffer(e)}
                      />
                    </div>

                    <div className="category-title">Description</div>
                    <div className="dsc1">
                      <textarea
                        className="dsc2"
                        type="text"
                        name="description"
                        onChange={(e) => this.EditItemDescription(e)}
                      />
                    </div>

                    <div className="upload-button1">
                      <button
                        className="upload-btn1"
                        onClick={(e) => this.handleItemEdit(e)}>
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}




class ThirdPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showThirdPopup: false,
      loading: true,
      Ingredient: [],
    };
    // this.toggleThirdPopup = this.toggleThirdPopup.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }


  async componentDidMount() {
    const url = "http://localhost:8020/ingredients/getIngredients";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ Ingredient: data.ingredients, loading: false });
    this.searchArray = data;
  }

  handleAdd(_id) {
    fetch("http://localhost:8020/ingredients/inginproduct/" + this.props.id2 + "/" + _id, {
      method: "POST",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Ingredient add sucessfully !");
      });
    });
  }


  // async handleItemEdit(e) {
  //   e.preventDefault();

  //   let file = this.state.file;
  //   let name = this.state.name;
  //   let offer = this.state.offer;
  //   let description = this.state.description;

  //   let formdata = new FormData();

  //   formdata.append("imageUrl", file);
  //   formdata.append("name", name);
  //   formdata.append("offer", offer);
  //   formdata.append("description", description);

  //   axios({
  //     url: `http://localhost:8020/menu/update/` + this.props.id1,
  //     method: "PUT",
  //     headers: {
  //       authorization: `your token`,
  //     },
  //     data: formdata,
  //   }).then(
  //     (res) => {
  //       this.setState({ showSecondPopup: !this.state.showSecondPopup });
  //     },
  //     (err) => { }
  //   );
  // }

  // toggleThirdPopup(data) {
  //   this.setState({
  //     showThirdPopup: !this.state.showThirdPopup,
  //     activeId1: data._id,
  //   });
  // }

  render() {
    return (
      <div className="add-cp">
        <div className="add-cp1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeThirdPopup}
            >
              X
            </button>
          </div>

          <div>
            <label className="itn"> Ingredients</label>

            <div>
              <table className="ai">
                <td>Title</td>
                <td>Image</td>
                <td>Price</td>
                <td>Description</td>
                <td>Action</td>
              </table>

              {this.state.Ingredient.map((data) => (
                <div key={data._id}>
                  <div>
                    <div>
                      <table className="ai1">
                        <tr>
                          <td> {data.IngredientName}</td>
                          <td>
                            <img
                              height="80px"
                              width="80px"
                              className="img"
                              src={data.imageUrl}
                            />
                          </td>

                          <td>{data.price} ₹</td>
                          <td>{data.description}</td>
                          <td>
                            <IconButton aria-label="delete">
                              Add <AddBoxIcon color="primary" fontSize="large" onClick={() => this.handleAdd(data._id)} />
                            </IconButton>


                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>
    );
  }
}

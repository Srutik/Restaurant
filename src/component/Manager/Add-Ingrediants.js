import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Add-category.css';
import Sidesection from './Sidesection';

export class AddIngrediants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            IngredientName: null,
            price: null,
            description: null,
            people: [],
            id: null,
            showSecondPopup: false,
            activeOrderId: null,
            loading: true,
            imageUrl: "",
        }

        this.toggleSecondPopup = this.toggleSecondPopup.bind(this);

    }

    async componentDidMount() {
        /* const url = "http://192.168.0.61:8020/categorypost/categories";
         const response = await fetch(url);
         const data = await response.json();
         this.setState({ people: data.categoryposts,loading: false ,id:data.categoryposts._id}); */

        const url = "http://localhost:8020/ingredients/getingredients";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.ingredients, loading: false });
        this.searchArray = data
    }

    handleName(e) {
        let IngredientName = e.target.value
        this.setState({ IngredientName : IngredientName })
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({ file: file })
    }

    handlePrice(e) {
        let price = e.target.value
        this.setState({ price : price })
    }

    handleDescription(e) {
        let description = e.target.value
        this.setState({ description: description })
    }

    handleUpload(e) {
        let file = this.state.file
        let IngredientName = this.state.IngredientName
        let price = this.state.price
        let description = this.state.description

        let formdata = new FormData()

        formdata.append('imageUrl', file)
        formdata.append('IngredientName', IngredientName)
        formdata.append('price', price)
        formdata.append('description', description)


        axios({
            /*  url: `http://192.168.0.61:8020/categorypost/create`, */
            url: `http://localhost:8020/ingredients/addIngredient`,
            method: "POST",
            headers: {
                authorization: `your token`
            },
            data: formdata
        }).then((res) => {
            this.componentDidMount()

        }, (err) => {
        }
        )

    }

    delete(id) {
        /* fetch('http://192.168.0.61:8020/categorypost/delete/' + id,*/
        fetch('http://localhost:8020/ingredients/delete/' + id,
            {
                method: 'DELETE',
            }).then((data) => {
                data.json().then((resp) => {
                    alert("Are You Sure Delete")
                    this.componentDidMount()
                })
            })
    }

    update(id) {

        fetch('http://localhost:8080/ingredients/update/' + id, {
            method: 'PUT',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    toggleSecondPopup(data) {
        this.setState({
            showSecondPopup: !this.state.showSecondPopup,
            activeId1: data._id

        });
    }


    renderTableData() {
        return this.state.people.map((data) => {
            return (

                <tr key={data._id}>

                    <td><div className="category-name">{data.IngredientName}</div></td>

                    <td><img height="100px" width="100px" className="img" src={data.imageUrl} /></td>

                    <td><div className="category-name">{data.price}</div></td>

                    <td><div className="category-name">{data.description}</div></td>


                    <td><div className="button2">
                        <button className="cart-button" onClick={() => this.toggleSecondPopup(data)}>Update Item</button>
                    </div>
                    </td>

                    {this.state.showSecondPopup ? (
                        <SecondPopup
                            id1={this.state.activeId1}
                            closeSecondPopup={() => this.toggleSecondPopup(data)}
                        />
                    ) : null}

                    <td>
                        <div className="button3">
                            <button className="btn3" onClick={() => this.delete(data._id)}> Delete </button>
                        </div></td>

                </tr>
            )
        })
    }

    render() {
        return (
            <div className="manager-additem">
                <Sidesection />
                <div className="add-category">
                    <div className="container">

                        <h4>Add Ingrediants</h4>

                        <div className="file">
                            <input type="file" multiple name="file" onChange={(e) => this.handleFile(e)} />
                        </div>

                        <div className="title">Title</div>
                        <div className="text1">
                            <input type="text" className="text2" multiple name="IngredientName" onChange={(e) => this.handleName(e)} />
                        </div>

                        <div className="title">Price</div>
                        <div className="text1">
                            <input type="text" className="text2" multiple name="price" onChange={(e) => this.handlePrice(e)} />
                        </div>

                        <div className="title">Description</div>
                        <div className="text1">
                            <input type="text" className="text2" multiple name="description" onChange={(e) => this.handleDescription(e)} />
                        </div>

                        <div className="button1">
                            <button className="btn1" onClick={(e) => this.handleUpload(e)}>Upload</button>
                        </div>
                    </div>

                    <div className="container1">

                        <div className="category-manager">Categories</div>

                        <div className="content">

                            <table id="table" >

                                <tr>
                                    <th width="130px" height="50px">Title</th>
                                    <th width="170px" height="50px">Image</th>
                                    <th width="550px" height="50px">Price</th>
                                    <th width="550px" height="50px">Description</th>
                                    <th width="550px" height="50px">Action</th>
                                </tr>

                            </table>

                        </div>

                        <div>

                            <table id='students'>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddIngrediants;


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
            price:"",
            activeId1:null,
        };
        this.toggleSecondPopup = this.toggleSecondPopup.bind(this);

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

    EditItemDescription(e) {
        let description = e.target.value;
        this.setState({ description: description });
    }

    async handleItemEdit(e) {
        e.preventDefault();

        let file = this.state.file;
        let name = this.state.name;
        let description = this.state.description;

        let formdata = new FormData();

        formdata.append("imageUrl", file);
        formdata.append("IngredientName", name);
        formdata.append("description", description);

        axios({
            url: `http://localhost:8020/ingredients/update/` + this.props.id1,
            method: "PUT",
            headers: {
                authorization: `your token`,
            },
            data: formdata,
        }).then(
            (res) => {this.setState({showSecondPopup: !this.state.showSecondPopup})
            },
            (err) => { }
        );
    }

    toggleSecondPopup(data) {
        this.setState({
            showSecondPopup: !this.state.showSecondPopup,
            activeId1: data._id
        });
    }


    render() {
        return (
            <div className='Secondpopup-item'>
                <div className='SecondpopupItem_inner'>
                    <div className="secondcloseItem-set">
                        <button className="secondcloseItem-btn" onClick={this.props.closeSecondPopup}>X</button>
                    </div>

                    <div>
                        
                            <div className="container">
                                    <h4>Add Ingrediants</h4>

                                    <div className="file">
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(e) => this.EditItemFile(e)}
                                        />
                                    </div>

                                    <div className="Itemtitle">Title</div>
                                    <div className="text1">
                                        <input
                                            className="text2"
                                            type="text"
                                            name="name"
                                            onChange={(e) => this.EditItemName(e)}
                                        />
                                    </div>

                                    <div className="price1">Price (RS)</div>
                                    <div className="price2">
                                        <input
                                            className="price3"
                                            type="number"
                                            name="originalPrice"
                                            min="1"
                                            onChange={(e) => this.EditItemPrice(e)}
                                        />
                                    </div>


                                    <div className="dsc">Description</div>
                                    <div className="dsc1">
                                        <textarea
                                            className="dsc2"
                                            type="text"
                                            name="description"
                                            onChange={(e) => this.EditItemDescription(e)}
                                        />
                                    </div>

                                    <div className="button4">
                                        <button className="btn4" onClick={(e) => this.handleItemEdit(e)}>
                                            Submit
                                        </button>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
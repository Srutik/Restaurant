import React, { Component } from 'react'
import './OrderList.css';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CookSidesection from './Cook-sidesection';
import ReactPaginate from 'react-paginate';


export class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showPopup: false,
            showDeletePopup: false,
            activeOrderId: null,
            AllOrder: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0
        };

        this.toggleDeletePopup = this.toggleDeletePopup.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.accept = this.accept.bind(this);
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
            AllOrder: slice
        })

    }

    async accept(_id) {
        try {
            const response = await fetch("http://localhost:8020/order/receive/" + _id, {
                method: "PUT",
            })
            let data = await response.json()
            alert("Your Order is Received !")
            console.log(data)
            this.props.history.push("process-order");
        } catch (err) {
            console.log(err)
        }
    }


    toggleDeletePopup(order1) {
        this.setState({
            showDeletePopup: !this.state.showDeletePopup,
            activeOrderId: order1._id,
        });
    }

    async componentDidMount() {
        try {
            const url = "http://localhost:8020/order/list";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    OrderIs: "Pending",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ` + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            var slice = data.list.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.list.length / this.state.perPage),
                orgtableData: data.list,
                loading: false,
                AllOrder: slice
            })
            this.searchArray = data
        } catch (err) {
        }
    }

    render() {
        return (
            <div>
                <CookSidesection />
                <div>
                    <div className="cookorder-List">
                        <h1 className="cookorder-title">Orders</h1>
                    </div>
                    <div className="cookorder-card">
                        {this.state.AllOrder.map(order1 => (
                            <div key={order1._id}>
                                <div className="order-head">
                                    <div className="cookorder-total">Name:{order1.name}</div>
                                    <div className="cookorder-total">Grand Total:{order1.grandTotal}</div>
                                    <div className="cookorder-total">Date:{order1.createdAt}</div>
                                </div>
                                <div className="cookall-orderbtn">
                                    <div className="cookall-orders">
                                        {order1.items.map((suborder) =>
                                            <div key={suborder._id}>
                                                <div className="cooksingle-order">
                                                    <div classname="cookcart-images">
                                                        <img height="100px" width="100px" src={suborder.productId} />
                                                    </div>
                                                    <div className="cookorder-data">Quantity:{suborder.qty}</div>
                                                    <div className="cookorder-data">Priority:{suborder.priority}</div>
                                                    <div className="cookorder-data">Price:{suborder.productPrice} ₹ </div>
                                                    <div className="cookorder-total">Grand Total:{suborder.total} ₹ </div>
                                                </div>
                                            </div>)}
                                    </div>
                                    <div className="accept-reject" >
                                        <div className="accept-margin">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="accept-btn"
                                                onClick={() => this.accept(order1._id)}
                                            >
                                                Accept
                                            </Button>
                                        </div>

                                        <div className="accept-margin">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className="reject-btn"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => this.toggleDeletePopup(order1)}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                        {this.state.showDeletePopup ?
                                            <DeletePopup _id={this.state.activeOrderId}
                                                text='Close Me'
                                                closeDeletePopup={() => this.toggleDeletePopup(order1)}
                                            />
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
        )
    }
}

export default OrderList;

class DeletePopup extends React.Component {
    constructor(props) {
        super(props);
    }

    async cancle() {
        try {
            const response = await fetch("http://localhost:8020/order/cancel/" + this.props._id, {
                method: "PUT",
            })
            let data = await response.json()
            alert("Your Order is Rejected !")
            console.log(data)
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <div className="close-set">
                        <button className="close-btn" onClick={this.props.closeDeletePopup}>X</button>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="Order-Name">Order Reject</label>
                            <div>Are You Sure to Reject the Order.</div>
                            <div className="order-btn">
                                <button className="cart-button" onClick={() => this.cancle()}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


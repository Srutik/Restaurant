import React, { Component } from 'react'
import './ManagerHome.css';
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection';
import { HiShoppingCart } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';

export class Dashboard extends Component {

  constructor(props) {

    super(props);
    this.state = {
      category: "",
      categoryposts: 0

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/categorypost/categories"
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ category: data.categoryposts.length, loading: false });
    this.searchArray = data
  }

  render() {

    return (

      <div>
        <div className="flex-category1">

          <div className="flex-category2">

            <Link className="link" to="/category">
              <div className="dash_icon-title">
                <h3> <FaClipboardList className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                <h2 className="dash-titles">TOTAL CATEGORY
              <div>{this.state.category}</div>
                </h2>
              </div>
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

export class Dashboard1 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      order: "",
      orders: 0

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/order/getorders"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ order: data.orders.length, loading: false });
    this.searchArray = data
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">
            <Link className="link" to="/table-order" >
              <div className="dash_icon-title">
                <h3> <HiShoppingCart className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                <h2 className="dash-titles">LIVE ORDER
              <div>{this.state.order}</div>
                </h2>
              </div>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export class Dashboard3 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      people: "",

    }
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
    this.setState({ people: data.totalPersons, });
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">

            <Link className="link" to="/viewCook" >
              <div className="dash_icon-title">
                <h3> <FaClipboardList className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                <h2 className="dash-titles">VIEW COOK
              <div>{this.state.people}</div>
                </h2>
              </div>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export class Dashboard4 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      people: "",

    }
  }

  async componentDidMount() {
    const url = "http://localhost:8020/all/get";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        activerole: "Waiter",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    this.setState({ people: data.totalPersons });
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">

            <Link className="link" to="/viewWaiter" >
              <div className="dash_icon-title">
                <h3> <FaClipboardList className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                <h2 className="dash-titles">VIEW WAITER
              <div>{this.state.people}</div>
                </h2>
              </div>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export class Dashboard5 extends Component {

  constructor(props) {

    super(props);
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">

            <Link className="link" to="/revenue" >
              <div className="dash_icon-title">
                <h3> <FaClipboardList className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                <h2 className="dash-titles">VIEW REVENUE</h2>
              </div>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export class Dashboard6 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      rating: ""

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/feedback/average"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ rating: data.rating, loading: false });
    this.searchArray = data
  }

  render() {

    return (
      <div classNam="wave-container">
        <Sidesection />

        <h1 className='title-managerpage'>
          Dashboard
  </h1>


        <div className="DashView-Manager">

          <Dashboard />
          <Dashboard1 />
          <Dashboard3 />
          <Dashboard4 />
          <Dashboard5 />

          <div className="flex-category3">
            <div className="flex-category4">
              <Link className="link" to="/review" >
                <div className="dash_icon-title">
                  <h3> <FaStar className="dash-icons" style={{ fontSize: 40 }} /> </h3>
                  <h2 className="dash-titles">AVERAGE RATTING
              <div>{this.state.rating}</div>
                  </h2>
                </div>
              </Link>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#273033" fill-opacity="1" d="M0,256L48,240C96,224,192,192,288,149.3C384,107,480,53,576,58.7C672,64,768,128,864,170.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    )
  }
}
export default Dashboard6;


/*
import React, { Component } from 'react'
import './ManagerHome.css';
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection';
export class ManagerHome extends Component {
    render() {
        return (
            <div className="manager-dashboard">
                <div>
                    <Sidesection />
                    <div className="dash-title">Dashboard</div>
                </div>
            </div>
        )
    }
}

export default ManagerHome; */





import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

class MenuList extends React.Component {
  state = {
    loading: true,
    people: [],
    cart:[]
  };

  async componentDidMount(_id) {
        
    const url = "http://192.168.0.61:8020/menu/menu/" + _id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ cart: data.product });
    this.searchArray = data
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.people.length) {
      return <div>didn't get Menu</div>;
    }

    return (
        <div>
          <h1 className="List">Menu List</h1>
        <div className="card">
          {this.state.cart.map(person => (
            <div key={person._id}>
              <div className="cardItem">
               <div classname="image" >
                 <img src={person.imageUrl}/>
              </div> 
                <div className="content">
                <div className="FoNt">{person.name}</div>
                <div className="FoNt">{person.price}</div>
                <div className="FoNt">{person.description}</div>
                </div>
                
              </div>
            </div>
          ))}       
          </div>
  
          </div>    );
    }
  }
  
  export default MenuList; 

  
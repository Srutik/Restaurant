import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    loading: true,
    people: []
  };


  async componentDidMount() {
    const url = "http://192.168.0.63:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
  }

  handleClick() {
    alert("You have just Clicked !")
  }


  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.people.length) {
      return <div>didn't get Menu</div>;
    }

    
    return (
      
      <div className="card">
        
        {this.state.people.map(person => (
          <div key={person._id}>
            <div className="cardItem">
             <div classname="image" >
             <Link to='/subcategory-indian'>
               <img src={person.imageUrl}  /></Link>
            </div>
              <div className="content">
              <div className="font">{person.categoryName}</div>
              <div className="font">{person.name}</div>
              <div className="font">{person.description}</div>
              <div>
                <button onClick={this.handleClick} className="btn">Add to Cart</button>
              </div>
              </div>
              
            </div>
          </div>
        ))}       
        </div>
    );
  }
}

export default Menu; 
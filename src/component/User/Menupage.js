import React from "react";
import './Menupage.css';
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
            <Link to='/subcategory-indian'
      >
            <div className="cardItem">
             <div classname="image" >
               <img src={person.imageUrl}  />
            </div>
              <div className="content">
              <div>{person.categoryName}</div>
              <div>{person.name}</div>
              <div>{person.description}</div>
              <div>{person._id}</div>
              </div>
            </div>
            </Link>
          </div>
        ))}
       
        </div>
    );
  }
}

export default Menu; 
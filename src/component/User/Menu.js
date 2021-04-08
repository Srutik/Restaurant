import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    loading: true,
    people: []
  };


  async componentDidMount() {
    const url = "http://192.168.0.61:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
  }

 handleClick(_id) {

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
      <h1 className="List">Category List</h1>
      <div className="card">
        {this.state.people.map(person => (
          <div key={person._id}>
             <Link to={`/subcategory/${person._id}`}>
            <div className="cardItem">
             <div classname="image" >
               <img src={person.imageUrl}/>
            </div> 
              <div className="content">
              <div className="font">{person.categoryName}</div>
              <div className="font">{person.name}</div>
              <div className="font">{person.description}</div>
              </div>
              
            </div>
            </Link> 
          </div>
        ))}       
        </div>
        </div>
    );
  }
}

export default Menu; 
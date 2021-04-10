import React from "react";
import './Menu.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    loading: true,
    people: [],
    store:''
  };


  async componentDidMount() {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwicGhvbmUiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiNjA2NTJkMjg0NjM1YjcxNTYwMDA5NTE3IiwiaWF0IjoxNjE4MDQ3OTUwLCJleHAiOjE2MTgwNDgxNTB9.nw8KaxEQaPf_K3OCXRjVvDBj3E5Iq56VOlYPrR0a3-Y'
    const url = "http://192.168.0.3:8080/feed/getposts";
    const response = await fetch(url,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
  }

 handleClick(_id) {

  }


  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
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
              <div className="FoNt">{person.categoryName}</div>
              <div className="FoNt">{person.name}</div>
              <div className="FoNt">{person.description}</div>
              <div className="btton">
              </div>
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




/* 
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
              <div className="FoNt">{person.categoryName}</div>
              <div className="FoNt">{person.name}</div>
              <div className="FoNt">{person.description}</div>
              <div className="btton">
              </div>
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

export default Menu; */
import React from "react";
import './Subcategory.css';

class Subcategory extends React.Component {
  state = {
    loading: true,
    people: []
  };


  async componentDidMount() {
    const url = "http://192.168.0.61:8020/subcategory/subcategories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.subcategory, loading: false });
  }

  handleClick() {
    alert("You have clicked !")
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
      <h1 className="subTitle">Subcategory List</h1>
      <div className="grid-container">
        {this.state.people.map(person => (
          <div key={person._id}>
            <div className="grid-item">
             <div classname="subImage" >
               <img className="image" src={person.imageUrl}/>
            </div> 
              <div className="subcontent">
              <div className="subfont">{person.subcategoryName}</div>
              <div className="subfont">{person.name}</div>
              <button className="cartbutton" onClick={() => this.handleClick()}>Add to cart</button>
              <div className="subbtton">
              </div>
              </div>
              
            </div>
          </div>
        ))}       
        </div>
        </div>
    );
  }
}

export default Subcategory; 

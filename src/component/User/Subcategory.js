import React from "react";
import './Subcategory.css';

class Subcategory extends React.Component {
  state = {
    loading: true,
    people: []
  };

  async componentDidMount() {
    const url = "http://localhost:8020/menu/menues";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
}
 /* async componentDidMount() {
    const url = "http://192.168.0.61:8020/subcategory/subcategories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.subcategory, loading: false });
  }
  handleClick() {
    alert("You have clicked !")
  }
*/

  render() {

    if (this.state.loading) {
      this.componentDidMount();
      return <div>loading...</div>;
    }

    if (!this.state.people.length) {
      return <div>didn't get Menu</div>;
    }

    
    return (
      <div>
        <div className="List">
              <h1 className="titles">Menu List</h1>
            </div>
            <div className="card1" >
              {this.state.people.map(person => (
                <div key={person._id}>
                  <div className="cardItem1">
                    <div classname="image">
                      <img width="200px" height="200px" src={person.imageUrl} />
                    </div>
                    <div className="content">
                      <div className="Font1">Name:- {person.name}</div>
                      <div className="price">
                        <div className="Font1">price:- {person.originalPrice} ₹ </div>
                      </div>
                      <div className="Font1">Description:- {person.description}</div>
                      <div >
                        <div className="priority-set">
                            <button type="button" className="priority-btn" onClick={this.incrementCount}>+</button>
                            <p>Priority : {this.state.priority}</p>
                            <button type="button" className="priority-btn" onClick={this.DecrementCount}>-</button>
                      </div>

                      <div className="Quantity-set">
                            <button type="button" className="Quantity-btn" onClick={this.incrementQTY}>+</button>
                            <p>Quantity : {this.state.quantity}</p>
                            <button type="button" className="Quantity-btn" onClick={this.DecrementQTY}>-</button>
                      </div>
                      
                      </div>
                      <button className="addCart" onClick={() => this.addCart(person._id, this.state.priority, this.state.quantity)}>Add to Cart</button>
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

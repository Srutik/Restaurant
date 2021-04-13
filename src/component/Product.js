import React from 'react';

class Product extends React.Component {
  state = {
    loading: true,
    product: [],
};

  async componentDidMount() {
    const url = "http://192.168.0.61:8020/menu/menues";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ product: data.products, loading: false });
  }

  async addToCart(_id, qty) {
    try {
      const response = await fetch("http://192.168.0.61:8020/cart/addtocart/" + _id, {
        method: "POST",
        body: JSON.stringify({
          email:"srutik.borda@gmail.com",
          qty: qty,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      let data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.product.length) {
      return <div>didn't get Menu</div>;
    }

    return (
      <div>
      <div className="card">
        {this.state.product.map(product => (
          <div key={product._id}>
            <div className="cardItem">
             <div classname="image" >
               <img src={product.imageUrl}/>
            </div> 
              <div className="content">
              <div className="FoNt">{product.name}</div>
              <div className="FoNt">{product.description}</div>
              <div className="FoNt">{product.price}</div>
              <div className="btton">
                <button onClick={(e) => this.addToCart(product._id, 1)}>Add to Cart</button>
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

export default Product;



/*

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
            <div className="cardItem">
             <div classname="image" >
               <img src={person.imageUrl}/>
            </div> 
              <div className="content">
              <div className="FoNt">{person.categoryName}</div>
              <div className="FoNt">{person.name}</div>
              <div className="FoNt">{person.description}</div>
              <div className="btton">
                <button >Add to Cart</button>
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

export default Menu; */
import React, { Component } from "react";
import axios from "axios";
import './All-offer.css';

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: "0",
      products: [],
      defaultOffers:"0",
    };
  }

  handleOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  handleUpload(e) {
    let offer = this.state.offer;

    let formdata = new FormData();

    formdata.append("offer", offer);

    axios({
      url: `http://localhost:8020/offer/offer`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { products } = data;
        this.setState({ products });
      });
  }

  handleRemoveUpload(e) {
    let offer = this.state.defaultOffers;

    let formdata = new FormData();

    formdata.append("offer", offer);

    axios({
      url: `http://localhost:8020/offer/offer`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { products } = data;
        this.setState({ products });
      });
  }

  render() {
    return (
      <div>
        <h1>Restaurant Offer Set</h1>

        <div>
          <div className="ct">
            <div className="ct1">
              <div className="ct2">
                <div className="title">Set All Item Offer (%)</div>
                <div className="text1">
                  <input
                    type="number"
                    className="text2"
                    placeholder="Value In Percentage"
                    min="1"
                    max="100"
                    name="offer"
                    onChange={(e) => this.handleOffer(e)}
                  />
                </div>

                <div className="button1">
                  <button
                    className="btn1"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="title">Remove All Item Offer (%)</div>
              <div className="text1">
                <input
                  type="number"
                  className="text2"
                  min="0"
                  max="0"
                  name="offer"
                  value="0"
                  onChange={(e) => this.handleOffer(e)}
                />
              </div>

              <div className="button1">
                <button className="btn1" onClick={(e) => this.handleRemoveUpload(e)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="pot">
              <td>Name</td>
              <td>Original Price</td>
              <td>Offer</td>
              <td>Offer Price</td>
            </table>


        {this.state.products.map((item) => (
          <div key={item._id}>
           
            <div>
              <table className="pot1">
                <tr>
                  <td>
                    <div>{item.name}</div>
                  </td>

                  <td>
                    <div>{item.originalPrice}</div>
                  </td>
                  <td>
                    <div>{item.offer}</div>
                  </td>

                  <td>
                    <div >{item.offerPrice.toFixed()}</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Offer;
import React, { Component } from 'react';
import './Rating.scss'
import Sidebar from '../Admin-sidebar/Sidebar';

export class Ratings extends Component {

    constructor(props) {

        super(props);
        this.state = {

            people: [],

        }
    }

    
    async componentDidMount() {

        const url = "http://localhost:8020/feedback/feedbacks"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.feedbacks, loading: false });
        this.searchArray = data
    }
   

    render() {

        return (

            <div>
              <Sidebar />
            <h1>Ratings</h1>
            <div>
            <table className="rt">
             
             <td>Title</td>
             <td>Ratings</td>
             <td>Message</td>
             <td>Time</td>
        
          
           </table>
              {this.state.people.map((rating) => (
                <div key={rating._id}>
                  <div>
                    <div>
                    <table className="rt1">
                        <tr>
                          <td> {rating.title}</td>
                          <td> {rating.rating}</td>
                          <td>{rating.message}</td>
                         <td> {rating.created_At}</td>
                          
                        </tr>
                        </table>
                    
                    </div>
    
                  
                  
                  </div>
                </div>
              ))}
            
            </div>
          </div>
        );
      }
    }

export default Ratings;


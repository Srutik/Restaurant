import React, { Component } from 'react'
import './Dashboard.css';
import Sidesection from './Sidesection';
export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          complaints: [],
          showPopup: false,
          showPopup1: false,
          id:"",
          id1:""
    
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.togglePopup1 = this.togglePopup1.bind(this);
    
      }
      
      handleSubmit1(event) {
        console.log('nothing', this.state)
        const obj1 = {
            address_type: this.state.addressType,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        };
        console.log(obj1);
    fetch('http://127.0.0.1:8000/api/address/post',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj1)
    })
    .then((Response) => Response.json())
    .then((result) => {
        console.log(result);
    })
}


handleSubmit3(id, event, pk) {
console.log('nothing', this.state)
const obj1 = {
    address_type: this.state.addressType,
    address1: this.state.address1,
    address2: this.state.address2,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip,
};
console.log(obj1);
fetch('http://127.0.0.1:8000/api/address/put/' + id,
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj1)
    })
    .then((Response) => Response.json())
    .then((result) => {
        console.log(result);
    })
}
// useEffect(event) {
//     console.log('nothing', this.state)
//     const obj1 = {
//         address_type:this.state.addressType,
//         address1:this.state.address1,
//         address2:this.state.address2,
//         city:this.state.city,
//         state:this.state.state,
//         zip:this.state.zip,
//     };
//     console.log(obj1);
//     fetch('http://127.0.0.1:8000/api/address/delete/1', 
//     {  
//         method: 'DELETE',
//         headers: {  
//             'Accept': 'application/json',  
//             'Content-Type': 'application/json',
//         },   
//         body: JSON.stringify(obj1)
//     })
//     .then((Response) => Response.json())      
//     .then((result) => {  
//     console.log(result);   
//     })             
//     } 

    render() {


        
        return (
            <div className="manager-dash">
                <Sidesection />
            </div>
        )
    }
}

export default Dashboard;
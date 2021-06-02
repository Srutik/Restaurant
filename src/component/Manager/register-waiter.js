import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import loginImg from "../login.svg";
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection';
import "../Login.scss";

 function RegisterWaiter() {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [activerole,setactiverole] = useState();
  const history = useHistory();

  async function signup() {
    let data={email,name,password,phone,activerole}
    console.warn(data)

    let result = await fetch("http://localhost:8020/all/register" , {
      method:'PUT',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      },
    })
   result = await result.json()
   localStorage.setItem("user-info", JSON.stringify(result)) 
   alert("waiter Created !")
   history.push("/manager-home")
   }
 
    return (
      <div>
        <Sidesection />

        <div className='link-set'>
                        <div className="details-set_data">
                            <Link to="/register-manager" className="link-effect">
                                <div className="details-link">Add Cook</div>
                            </Link>
                        </div>

                        <div className="details-set_datavalue">
                            <Link to="/register-waiter" className="link-effect">
                                <div className="details-linkvalue">Add Waiter</div>
                            </Link>
                        </div>
                    </div>
  
      <div className="base-container" >
        <div className="header">Register Waiter</div>
        <div className="content">
          <div className="image-set">
            <img src={loginImg} height="150px" width="200px" alt={1}/>
          </div>
          <div className="form">
            <div className="radio-btn">

              <input type="radio" className="radio" name="select" value="cook" onChange={e => setactiverole(e.target.value)} />
              <label className="label-register" for="cook">Cook</label>

              <input type="radio" className="radio" name="select" value="Waiter" onChange={e => setactiverole(e.target.value)} />
              <label className="label-register" for="Waiter">Waiter</label>

            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="name" placeholder="username" onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input maxLength="10" type="text" name="phone" placeholder="Phone no." onChange={e => setPhone(e.target.value)} />
            </div>
            <div className= "form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={signup} className="btns"> 
            Register
          </button>
          </div>

        </div>
      </div>
    );
  }

export default RegisterWaiter;
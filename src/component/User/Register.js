import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import loginImg from "../login.svg";
import { Link } from 'react-router-dom';
 import LoginNav from '../Login-navbar';
import "../Login.scss";

 function Register() {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const history = useHistory();

  async function signup() {
    let data={email,name,password,phone}
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
   history.push("/")
   }
 
    return (
      <div>  
      <div className="base-container" >
        <div className="header">Register</div>
        <div className="content">
          <div className="image-set">
            <img height="150px" width="150px" src={loginImg} alt={1}/>
          </div>
          <div className="form">
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

          <div className="next">
            Already Have an Account ? 
        <Link to='/Login' className="link">Login</Link>
        </div> 
        </div>
      </div>
    );
  }

export default Register;
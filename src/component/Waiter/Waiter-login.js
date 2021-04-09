import React,{useState} from "react";
import PropTypes from 'prop-types';
import loginImg from '../login.svg';
import { Link } from 'react-router-dom';
import LoginNav from '../Login-navbar';
import {useHistory} from 'react-router-dom';
import "../Login.scss";

 function AdminLogin() {

  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  async function login() {
    let data={email,password}
    console.log(data)
    
    try {
    let result = await fetch("http://192.168.0.61:8020/waiter/waiterlogin" , {
      method:'POST',
      headers:{
        "Content-Type":'application/json; charset=UTF-8', 
        "Accept":'application/json'
      },
      body:JSON.stringify(data),
    })
   result = await result.json()
   localStorage.setItem("user-info", JSON.stringify(result)) 
   history.push("/weiter-home")
  }catch (error) {
    alert("Your Email and Password Doesn't match !")
  }
   }

 /* const handleClick = async e => {
    e.preventDefault();
    const token = await loginUser ({
      username,
      password
    });
    setToken(token);
  } */

    return (
        <div>
            <LoginNav />
      
      <div className="base-container" >
        <div className="header">Welcome !</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt={1} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="email"  placeholder="username" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </div>

        <Link to='/waiter-forgot' className='admin'>
            Forgot Password
        </Link> 
        <div className="footer">
          <button type="button" onClick={login} className="btns">
            Login
          </button>
        </div>  
        </div>
      </div>
    );
  }

  AdminLogin.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  export default AdminLogin;
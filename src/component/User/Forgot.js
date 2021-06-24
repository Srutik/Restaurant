import React, { useState } from "react";
import PropTypes from 'prop-types';
import loginImg from '../login.svg';
import { useHistory } from 'react-router-dom';
import "../Login.scss";



function Forgot() {

  const [email, setUserName] = useState();
  const history = useHistory();


  async function send() {
    let data = { email }
    console.log(data)

    if (email == null) {
      alert("Please Enter an Email !")
      return send
    }

    try {
      let result = await fetch("http://192.168.0.63:8020/home/forgotP", {
        method: 'PUT',
        headers: {
          "Content-Type": 'application/json; charset=UTF-8',
          "Accept": 'application/json'
        },
        body: JSON.stringify(data),
      })
      result = await result.json()
      localStorage.setItem("user-info", JSON.stringify(result))
      history.push("/reset")
    }
    catch (error) {
      alert("Your Email is Wrong !")
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
    <div className="base-container" >
      <div className="header">Forgot Password</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt={1} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="email" required placeholder="username" onChange={e => setUserName(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" onClick={send} className="btns">
          Send
          </button>
      </div>
    </div>
  );
}

Forgot.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Forgot;
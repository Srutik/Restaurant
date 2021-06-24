import React,{useState} from "react";
import PropTypes from 'prop-types';
import loginImg from '../login.svg';
import {useHistory} from 'react-router-dom';
import "../Login.scss";

 function Reset() {

  const [email,setEmail] = useState();
  const [otp1, setOtp] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();


  async function submit() {
    let data={otp1,email,password}
    console.log(data)
  
    
    let result = await fetch("http://localhost:8020/manager/managerresetP" , {
      method:'POST',
      headers:{
        "Content-Type":'application/json; charset=UTF-8', 
        "Accept":'application/json'
      },
      body:JSON.stringify(data),
    })
   result = await result.json()
   localStorage.setItem("user-info", JSON.stringify(result)) 
   history.push("/manager-login")
   }

    return (
      <div className="base-container" >
        <div className="header">Manager ! Reset Password</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt={1} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Enter OTP</label>
              <input type="text" maxLength="6" name="otp1"  placeholder="username" onChange={e => setOtp(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter New Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" onClick={submit} className="btns">
            Submit
          </button>
        </div>
      </div>
    );
  }

  Reset.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  export default Reset;
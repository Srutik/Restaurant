import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import loginImg from "../login.svg";
import { Link } from 'react-router-dom';
import Sidesection from './Sidesection';
import "../Login.scss";
import axios from "axios";
import { Category } from "@material-ui/icons";

function Register() {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [category, setcategory] = useState([]);
  const history = useHistory();
  const [categoryId, setselectedId] = useState(category[0]);


  async function signup() {
    let data = { email, name, password, phone, activerole:"cook", categoryId }
    console.warn(data)
    let result = await fetch("http://localhost:8020/all/register", {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
    })
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result))
    alert("Cook Created !")
    history.push("/manager-home")
  }

  useEffect(() => {
    fetch("http://localhost:8020/categorypost/categories").then(
      response => (response.json())
        .then(response => setcategory(response.categoryposts))
    )
  }, [])

  //    useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //            await axios.get("http://localhost:8020/categorypost/categories").then(res => 
  //             setcategory(res.data.categoryposts.categoryName)
  //            )
  //            console.log(setcategory)
  //         } catch (e) {
  //             console.log(e);
  //         }
  //     };
  //     fetchUsers();
  // }, []);

  return (
    <div>
      <Sidesection />
      {/* <div>{JSON.stringify(category)}</div> */}
      <div className='link-set'>
        <div className="details-set_datavalue">
          <Link to="/register-manager" className="link-effect">
            <div className="details-linkvalue">Add Cook</div>
          </Link>
        </div>

        <div className="details-set_data">
          <Link to="/register-waiter" className="link-effect">
            <div className="details-link">Add Waiter</div>
          </Link>
        </div>
      </div>

      <div className="base-container" >
        <div className="header">Register Cook</div>
        <div className="content">
          <div className="image-set">
            <img height="150px" width="200px" src={loginImg} alt={1} />
          </div>
          <div className="form">

            {category.map(posts => console.log(posts))}

            {/* <div className="radio-btn">

              <input type="radio" className="radio" name="select" value="cook" onChange={e => setactiverole(e.target.value)} />
              <label className="label-register" for="cook">Cook</label>

              <input type="radio" className="radio" name="select" value="Waiter" onChange={e => setactiverole(e.target.value)} />
              <label className="label-register" for="Waiter">Waiter</label>

            </div> */}
            <div className="select-setfield">
              <div className="select-lable_category"> Select Category : </div>
           
            <select className="select-field" value={categoryId}  onChange={(e) => setselectedId(e.target.value)}>

              {category.map((person) => (
                <option className="category-content" value={person._id}>{person.categoryName}</option>
              ))}
            </select>
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
            <div className="form-group">
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

export default Register;
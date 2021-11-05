/* eslint-disable no-useless-constructor */
import React, { useState } from "react";
import "./style.scss";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Login = (props) => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [loginUser, {error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: {...userFormData },
      })

      Auth.login(data.login.token)

    } catch (error) {
      console.log(error);
    }

    setUserFormData({
      username: '',
      password: ''
    })
  }

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src="../login.png" alt="" />
        </div>
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="text" name="email" placeholder="E-Mail" onChange={handleInputChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
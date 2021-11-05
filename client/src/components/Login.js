/* eslint-disable no-useless-constructor */
import React, { useState } from "react";
import { Form, Input, Button } from 'semantic-ui-react'

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      })

      Auth.login(data.login.token)

      props.closeModal(false)

    } catch (error) {
      console.log(error);
    }

    setUserFormData({
      username: '',
      password: ''
    })
  }

  return (
    <>
      <Form size={'massive'} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Field
            control={Input}
            name='email'
            label='E-Mail'
            placeholder='E-Mail'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input 
            label='Password'
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Field size={'massive'} control={Button}>Log In</Form.Field>
      </Form>
    </>
  );
}

export default Login;
/* eslint-disable no-useless-constructor */
import React, { useState } from "react";
import { Form, Input, Button, Message } from 'semantic-ui-react'

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState(false)

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
      setErrorMessage(true)
    }

    setUserFormData({
      username: '',
      password: ''
    })
  }

  return (
    <>
      <Form error={errorMessage} size={'massive'} onSubmit={handleFormSubmit}>
        <Message
          error
          header='Invalid Login'
          content='Incorrect Username or Password'
        />
        <Form.Group>
          <Form.Field
            required
            control={Input}
            name='email'
            label='E-Mail'
            placeholder='E-Mail'
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            required
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
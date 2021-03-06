import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";

import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutations'

import Auth from '../utils/auth'

const Register = (props) => {

  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' })
  const [createUser, { error, data }] = useMutation(CREATE_USER)
  const [errorMessage, setErrorMessage] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      })
      console.log(data);

      Auth.login(data.createUser.token);

      props.closeModal(false)

    } catch (err) {
      setErrorMessage(true)
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form error={errorMessage} size={'massive'} onSubmit={handleFormSubmit}>
        <Message
          error
          header='Error'
          content='Error adding this user'
        />
        <Form.Group>
          <Form.Field
            control={Input}
            name='username'
            label='Username'
            placeholder='Username'
            onChange={handleInputChange}
          />
        </Form.Group>
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
        <Form.Field size={'massive'} control={Button}>Register</Form.Field>
      </Form>
    </>
  );

}

export default Register;
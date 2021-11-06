import React, { useState } from 'react';
import { Form, Button, Card, Dropdown } from 'semantic-ui-react';

import { useQuery } from '@apollo/client'
import { QUERY_CATEGORIES } from '../utils/queries'


const SearchForm = (props) => {

    const [formInput, setFormInput] = useState({
        title: '',
        category: '',
    })

    const { loading, data } = useQuery(QUERY_CATEGORIES, {
        variables: { ...formInput }
    })

    const categories = data?.categories.map(el => (
        {
            key: el.name,
            text: el.name,
            value: el._id
        }
    ))

    const handleInputChange = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value })
    }

    const handleDropdownChange = (event, data) => {
        setFormInput({ ...formInput, [data.name]: data.value })
    }

    const handleFormSubmit = (event) => {
        props.search(formInput)
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>Search</Card.Header>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input
                            placeholder='Title'
                            name='title'
                            value={formInput.title}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown
                            placeholder='Category'
                            name='category'
                            fluid
                            selection
                            options={categories}
                            onChange={handleDropdownChange}
                        />
                    </Form.Field>
                    <Button type='submit' onClick={handleFormSubmit}>Submit</Button>
                </Form>
            </Card.Content>
        </Card>
    )


}


export default SearchForm;
import React, { useState } from 'react';
import { Form, Button, Card } from 'semantic-ui-react';

import { useQuery } from '@apollo/client'
import { QUERY_CATEGORIES } from '../utils/queries'


const SearchForm = (props) => {

    const [formInput, setFormInput] = useState({
        title: '',
        category: '',
        sortBy: ''

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




    return (
        <Card>
            <Card.Content>
                <Form>
                    <Form.Group>
                        <Form.Input label="Search" placeholder="What do you want to learn?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select label='Category' options={categories} placehholder='Category' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Tag' placeholder='search for a tag' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form.Group>
                </Form>
            </Card.Content>
        </Card>
    )


}


export default SearchForm;
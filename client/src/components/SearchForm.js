import React from 'react';
import { Form, Button } from 'semantic-ui-react';


const SearchForm = () => {

    const categoryOptions = [
        { key: '1', text: 'Test1', value: 'Test1' },
        { key: '2', text: 'Test2', value: 'Test2' },
        { key: '3', text: 'Test3', value: 'Test3' },
      ]

    return (
        <Form>
            <Form.Group>
                <Form.Input label="Search" placeholder="What do you want to learn?" />
            </Form.Group>
            <Form.Group>
                <Form.Select label='Category' options={categoryOptions} placehholder='Category' />
            </Form.Group>
            <Form.Group>
                <Form.Input label='Tag' placeholder='search for a tag' />
            </Form.Group>
            <Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form.Group>
        </Form>
    )


}


export default SearchForm;
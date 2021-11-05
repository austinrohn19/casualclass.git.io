import React, {useState} from 'react'
import { Button, Dropdown, Message, Form } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'
import { QUERY_CATEGORIES } from '../../utils/queries'
import { CREATE_CLASS } from '../../utils/mutations'

const AddClassForm = () => {
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        previewVideoUrl: "",
        cost: "",
        category: "",
    });

    //Create Class in DB
    const [addClass, { error }] = useMutation(CREATE_CLASS)
    //Retrieve categories from backend here.
    const {loading, data} = useQuery(QUERY_CATEGORIES)

    const categories = data?.map(el => (
        {
            key: data.name,
            text: data.name,
            value: data._id
        }
    ))

    const handleInputChange = (event) => {
        setFormInput({...formInput, [event.target.name]: event.target.value})
    }

    const handleDropdownChange = (event) => {
        setFormInput({...formInput, category: event.target.value})
    }

    function costIsValid (cost) {
        return /(\d+\.\d{2})/.test(cost);
    }

    function formIsValid (form) {
        if (Object.keys(form).every((el) => form[el])) {
            if (costIsValid(form.cost)){
                return true;
            } else {
                alert('Please enter a valid price. i.e. (9.99)')
                return false;
            }
        } else {
            alert('Please do not leave fields empty.');
            return false;
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (formIsValid(formInput)) {
            //add class mutation
            try {
                const data = await addClass({
                    variables: {...formInput}
                });

                setFormInput({
                    from_name: "",
                    from_email: "",
                    subject: "",
                    message: ""
                })
            } catch (err) {
                console.error(err);
            }            
        }
    }

    return (
        <Form>
            <Form.Field>
                <label>Title</label>
                <input 
                    placeholder='Title'
                    value={formInput.title}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <input 
                    placeholder='Description'
                    value={formInput.description}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Video URL</label>
                <input 
                    placeholder='Video URL'
                    value={formInput.previewVideoUrl}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Cost</label>
                <input 
                    placeholder='Cost'
                    value={formInput.cost}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <Dropdown
                    placeholder='Select Category'
                    fluid
                    selection
                    options={categories}
                    onChange={handleDropdownChange}
                />
            </Form.Field>
            <Message
                success
                header='Class Submitted'
                content="Your class has been added!"
            />
            {error && (
                <Message
                error
                header='Submit Error'
                content={error.message}
              />
            )}
            <Button type='submit' onClick={handleFormSubmit}>Submit</Button>
        </Form>
    );
}

export default AddClassForm
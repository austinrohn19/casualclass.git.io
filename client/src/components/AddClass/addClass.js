import React, {useState} from 'react'
import { Button, Dropdown, Message, Form } from 'semantic-ui-react'

const categories = [] //Retrieve categories from backend here.

const AddClass = () => {
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        previewVideoUrl: "",
        cost: "",
        category: "",
    });

    const handleInputChange = (event) => {
        setFormInput({...formInput, [event.target.name]: event.target.value})
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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (formIsValid(formInput)) {
            //add class mutation
            setFormInput({
                from_name: "",
                from_email: "",
                subject: "",
                message: ""
            })
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
                    value={formInput.category}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Message
                success
                header='Class Submitted'
                content="Your class has been added!"
            />
            <Button type='submit' onClick={handleFormSubmit}>Submit</Button>
        </Form>
    );
}

export default AddClass
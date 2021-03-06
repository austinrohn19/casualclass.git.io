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
        previewImageUrl: "",
        cost: "",
        category: "",
    });

    //Create Class in DB
    const [addClass, { error }] = useMutation(CREATE_CLASS)
    //Retrieve categories from backend here.
    const {loading, data} = useQuery(QUERY_CATEGORIES)

    const categories = data?.categories.map(el => (
        {
            key: el.name,
            text: el.name,
            value: el._id
        }
    ))

    const handleInputChange = (event) => {
        setFormInput({...formInput, [event.target.name]: event.target.value})
    }

    const handleDropdownChange = (event, data) => {
        setFormInput({...formInput, [data.name]: data.value})
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
        
        formInput.cost = parseFloat(formInput.cost);
        
        if (formIsValid(formInput)) {
            //add class mutation
            try {
                const data = await addClass({
                    variables: {...formInput}
                });

                setFormInput({
                    title: "",
                    description: "",
                    previewVideoUrl: "",
                    previewImageUrl: "",
                    cost: ""
                });

                window.location.assign('/account')

                
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
                    name='title'
                    value={formInput.title}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <input 
                    placeholder='Description'
                    name='description'
                    value={formInput.description}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Message>
                <Message.Header>Video Notes</Message.Header>
                <p>At this time we are unable to host videos. Please include a youtube embed link for your videos.</p>
            </Message>
            <Form.Field>
                <label>Video URL</label>
                <input 
                    placeholder='https://www.youtube.com/embed/<Video Link>'
                    name='previewVideoUrl'
                    value={formInput.previewVideoUrl}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Message>
                <Message.Header>Image Notes</Message.Header>
                <p>At this time we are unable to host images. Please include a link where your image can be imported from.</p>
            </Message>
            <Form.Field>
                <label>Image URL</label>
                <input 
                    placeholder='https://example.com/imagelocation'
                    name='previewImageUrl'
                    value={formInput.previewImageUrl}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Cost</label>
                <input 
                    placeholder='Cost'
                    name='cost'
                    value={formInput.cost}
                    onChange={handleInputChange}
                />
            </Form.Field>
            <Form.Field>
                <Dropdown
                    placeholder='Select Category'
                    name='category'
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
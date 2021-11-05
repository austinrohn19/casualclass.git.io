import React from 'react';
import './SideBarHeader.scss'
import { Form, Button, Card } from 'semantic-ui-react';

export function SideBarHeader() {
  return (
    <Card>
            <Card.Content>
                <Form>
                    <Form.Group>
                        <Form.Input label="Search" placeholder="What do you want to learn?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select label='Category' placehholder='Category' />
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
  );
}
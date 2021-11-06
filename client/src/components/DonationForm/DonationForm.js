import React from 'react';
import { Header, Form } from 'semantic-ui-react';

import './DonationForm.scss';

function DonationForm() {
    return (
        <React.Fragment>
            <Header as="h2">Make a Donation!</Header>
            <Form className="donation-form">
                {/* DonationButton and CustomDonationInputGroup here */}
            </Form>
        </React.Fragment>
    )
}

export default DonationForm;

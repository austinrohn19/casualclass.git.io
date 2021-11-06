import React from 'react';
import { Header, Form } from 'semantic-ui-react';

import DonationButton from '../DonationButton/DonationButton';

import './DonationForm.scss';

function DonationForm() {
    return (
        <React.Fragment>
            <Header as="h2">Make a Donation!</Header>
            <Form className="donation-form">
                <DonationButton donationAmount={1} />
                <DonationButton donationAmount={5} />
                <DonationButton donationAmount={10} />
                <DonationButton donationAmount={20} />
            </Form>
        </React.Fragment>
    )
}

export default DonationForm;

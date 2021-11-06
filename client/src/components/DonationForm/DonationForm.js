import React from 'react';
import { Header, Form, Grid } from 'semantic-ui-react';

import DonationButton from '../DonationButton/DonationButton';

import './DonationForm.scss';

function DonationForm() {
    return (
        <React.Fragment>
            <Header as="h2">Make a Donation!</Header>
            <Form className="donation-form">
                <Grid className="donation-btns">
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={1} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={5} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={10} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={20} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={50} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <DonationButton donationAmount={100} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </React.Fragment>
    )
}

export default DonationForm;

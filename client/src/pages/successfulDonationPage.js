import React from 'react';
import { Header } from 'semantic-ui-react';

function SuccessfulDonationPage() {
    return (
        <div className="successful-donation-page">
            <Header as="h2">Success!</Header>
            <p>You have successfully made a donation!</p>
        </div>
    );
}

export default SuccessfulDonationPage;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import queryString from 'query-string';

function SuccessfulDonationPage() {
    const { search } = useLocation();
    const { session_id } = queryString.parse(search);
    return (
        <div className="successful-donation-page">
            <Header as="h2">Success!</Header>
            <p>You have successfully made a donation!</p>
        </div>
    );
}

export default SuccessfulDonationPage;

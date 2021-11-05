import React from 'react';
import { useQuery } from '@apollo/client';
import {} from 'semantic-ui-react';

import { QUERY_ME } from '../utils/queries';

function AccountPage() {
    const { loading, error, data } = useQuery(QUERY_ME);

    return (
        <div className="account-page">
            Account Page
        </div>
    )
}

export default AccountPage;
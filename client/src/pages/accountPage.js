import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Loader, Header, Label } from 'semantic-ui-react';

import RegisteredClassList from '../components/RegisteredClassList/RegisteredClassList';

import { QUERY_ME } from '../utils/queries';

import AuthService from '../utils/auth';

function AccountPage() {
    const { loading, error, data } = useQuery(QUERY_ME);

    if (loading) return <Loader />
    if (!AuthService.isLoggedIn()) return <Redirect to="/" />
    if (error) return error.message;

    const { me } = data;
    return (
        <div className="account-page">
            <Header as='h2'>{me.username}</Header>
            <Label>Average Rating: {me.averageRating}</Label>
            <RegisteredClassList joinedClasses={me.joinedClasses} />
        </div>
    )
}

export default AccountPage;
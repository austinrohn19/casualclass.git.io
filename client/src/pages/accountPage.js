import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Loader, Header, Label, Divider, Button } from 'semantic-ui-react';

import RegisteredClassList from '../components/RegisteredClassList/RegisteredClassList';
import CreatedClassList from '../components/CreatedClassList/CreatedClassList';

import { QUERY_ME } from '../utils/queries';

import AuthService from '../utils/auth';

function AccountPage() {
    const { loading, error, data } = useQuery(QUERY_ME);
    console.log(data)

    if (loading) return <Loader />
    if (!AuthService.loggedIn()) return <Redirect to="/" />
    if (error) return error.message;

    const { me } = data;
    return (
        <div className="account-page">
            <Header as='h2'>Username: {me.username}</Header>
            <Label>Average Rating: {me.averageRating}</Label>
            <RegisteredClassList joinedClasses={me.joinedClasses} />
            <CreatedClassList createdClasses={me.createdClasses} />
            <Divider />
            <Button as="a" href="/create-class">
                Create Class
            </Button>
        </div>
    )
}

export default AccountPage;
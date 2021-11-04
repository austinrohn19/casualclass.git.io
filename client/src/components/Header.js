import React, { useState } from 'react';
import { Menu,Image} from 'semantic-ui-react'
import logo from '../assets/login.png';
import {Link,} from 'react-router-dom';


const Header = () => {

    const [active, setActive] = useState('')

    const handleItemClick = (event, { name }) => {
        setActive(name);
    }

    return (
        <Menu>
            <Menu.Item href='/' header>Casual Class</Menu.Item>
            <Menu.Item
                name='Account'
                active={active === 'Account'}
                onClick={handleItemClick}
                href='/account'
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='Sign In'
                    active={active === 'Sign In'}
                    onClick={handleItemClick}
                    href='/login'
                />
                <Menu.Item
                    name='Sign Up'
                    active={active === 'Sign Up'}
                    onClick={handleItemClick}
                    href='/register'
                />
            </Menu.Menu>
        </Menu>

    )

}

export default Header;
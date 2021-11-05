import React, { useState } from 'react';
import { Menu, Image, Modal, Tab, Grid } from 'semantic-ui-react'
import logo from '../assets/login.png';
import { Link, } from 'react-router-dom';
import Auth from '../utils/auth'
import Login from './Login'
import Register from './Register'


const Header = () => {

    const [active, setActive] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handleItemClick = (event, { name }) => {
        setActive(name);
        if (name === 'login') {
            setOpenModal(true)
        }
    }

    const panes = [
        {
            menuItem: (
                <Menu.Item key='login'>
                    Login
                </Menu.Item>
            ),
            render: () => <Login closeModal={setOpenModal} />,
        },
        {
            menuItem: (
                <Menu.Item key='messages'>
                    Register
                </Menu.Item>
            ),
            render: () => <Register closeModal={setOpenModal} />,
        },
    ]

    return (
        <>
            <Menu>
                <Menu.Item header className='logo'>
                    <Link to='/'><Image src={logo} size='small' /></Link>
                </Menu.Item>
                {Auth.loggedIn() ? (
                    <>
                        <Menu.Item
                            name='Account'
                            active={active === 'Account'}
                            onClick={handleItemClick}
                            href='/account'
                        />

                    </>
                ) : (
                    <>
                    </>
                )}
                <Menu.Menu position='right'>
                    {Auth.loggedIn() ? (
                        <>
                            <Menu.Item
                                name="Log Out"
                                onClick={Auth.logout}
                            >Log Out</Menu.Item>

                        </>
                    ) : (
                        <>
                            <Menu.Item
                                name='login'
                                active={active === 'login'}
                                onClick={handleItemClick}
                            >Login/Register</Menu.Item>
                        </>
                    )}
                </Menu.Menu>
            </Menu>
            <Modal
                centered={false}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
            >
                <Modal.Content >
                    <Grid centered>
                        <Tab menu={{ size: 'massive' }} panes={panes} />
                    </Grid>
                </Modal.Content>

            </Modal>
        </>

    )

}

export default Header;
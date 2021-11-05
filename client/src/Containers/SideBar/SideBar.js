import React from 'react';
import SideBarItem from './SideBarItem/SideBarItem';
import {Menu, Divider} from 'semantic-ui-react';
import './SideBar.scss';
import {SideBarHeader} from './SideBarHeader/SideBarHeader';

import {SideBarFooter} from './SideBarFooter/SideBarFooter';

export class SideBar extends React.Component {
  render() {
    return (
      <Menu borderless vertical stackable fixed='left' className='side-nav'>
        <SideBarHeader/>
        <SideBarItem path='/' label='Home' icon='home'/>
        <SideBarItem label='History' icon='history'/>
        <SideBarItem label='Watch later' icon='clock'/>
        <SideBarItem label='Liked Lessons' icon='thumbs up'/>
        <Divider/>
        <SideBarItem label='Instructors' icon='male'/>
        <SideBarFooter/>
      </Menu>
    );
  }
}
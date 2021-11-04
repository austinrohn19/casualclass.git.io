import React from 'react';
import {Menu} from 'semantic-ui-react';
import './SideBarFooter.scss';

export function SideBarFooter(props) {
  const heading = props.title ? props.title.toUpperCase() : '';
  return (
    <Menu.Item>
      <Menu.Header className='side-bar-footer'>{heading}</Menu.Header>
    </Menu.Item>
  );
}
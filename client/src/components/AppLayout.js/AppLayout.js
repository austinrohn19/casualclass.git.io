import React from 'react';
import './AppLayout.scss';
import Header from '../../Containers/Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export function AppLayout(props) {
  return (
    <ScrollToTop>
      <div className='app-layout'>
        <Header/>
        {props.children}
      </div>
    </ScrollToTop>
  );
}
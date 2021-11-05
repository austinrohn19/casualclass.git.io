import React from 'react';
import {Icon, Image, Menu} from 'semantic-ui-react';
import './HeaderNav.scss';
import logo from '../../assets/images/logo.png';
import {Link, withRouter} from 'react-router-dom';

export class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  render() {
    return (
      // 1
      <Menu borderless className='top-menu' fixed='top'>
        {/* 2 */}
        <Menu.Item header className='logo'>
          <Link to='/'><Image src={logo} size='small'/></Link>
        </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Icon className='header-icon' name='alarm' size='large'/>
            </Menu.Item>
            {/* 7*/}
            <Menu.Item name='avatar'>
              <Image src='https://via.placeholder.com/80x80' avatar/>
            </Menu.Item>
          </Menu.Menu>
        
      </Menu>
    );
  }
  onInputChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  onSubmit = () => {
    const escapedSearchQuery = encodeURI(this.state.query);
    this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
  };
}

export default withRouter(HeaderNav);

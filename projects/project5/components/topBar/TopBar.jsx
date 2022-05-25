import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import fetchModel from '../../lib/fetchModelData.js';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { version : '', };
  }


  componentDidMount() {
    // Async call to server
    fetchModel('/test/info')
      .then((response) => {
        let version = response['data']['__v'];
        this.setState({ version : version });
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Photo Application (version {this.state.version})
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;

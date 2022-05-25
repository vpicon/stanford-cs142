import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
}
from '@material-ui/core';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './UserList.css';
import fetchModel from '../../lib/fetchModelData.js';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users : [], };
  }

  componentDidMount() {
    // Async call to server
    fetchModel('/user/list')
      .then((response) => {
        let users = response['data'];
        this.setState({ users : users });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  userFullName(user) {
    if (!user) return "";
    return user.first_name + " " + user.last_name;
  }

  userListItems() {
    //for (let user of users) console.log(this.userFullName(user));
    return (
      this.state.users.map((user) =>
          <ListItem divider={true} key={user._id}>
            <Link to={"/users/" + user._id} className="user-list-item">
              <ListItemText primary={this.userFullName(user)} />
            </Link>
          </ListItem>
      )
    );
  }

  render() {
    return (
      <Router>
        <List component="nav">
          {this.userListItems()}
        </List>
      </Router>
    );
  }
}

/*
  <Typography variant="body1">
    This is the user list, which takes up 3/12 of the window.
    You might choose to use <a href="https://material-ui.com/demos/lists/">Lists</a> and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
    display your users like so:
  </Typography>
  <List component="nav">
    <ListItem>
      <ListItemText primary="Item #1" />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Item #2" />
    </ListItem>
    <Divider />
    <ListItem>
      <ListItemText primary="Item #3" />
    </ListItem>
    <Divider />
  </List>
  <Typography variant="body1">
    The model comes in from window.cs142models.userListModel()
  </Typography>
*/

export default UserList;

import React from 'react';
import {
  Typography
} from '@material-ui/core';
import './UserDetail.css';
import {HashRouter as Router, Link} from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData.js';



/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user : {}, };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let userId = this.props.match.params.userId;
    // Async call to server
    fetchModel(`/user/${userId}`)
      .then((response) => {
        let user = response['data'];
        this.setState({ user : user });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <Router>
        <div className="user-detail">
          <Link to={"/photos/" + this.state.user._id}>
            <button type="button">Photos</button>
          </Link>

          <div>
            <span className="h2">{this.state.user.first_name + " " + this.state.user.last_name}</span>
          </div>
          <div className="my-2">
            <span className="fw-bold me-2">Location</span>
            <span>{this.state.user.location}</span>
          </div>
          <div className="my-2">
            <span className="fw-bold me-2">Occupation</span>
            <span>{this.state.user.occupation}</span>
          </div>
          <div className="my-2">
            <span className="fw-bold me-2">Description</span>
            <span>{this.state.user.description}</span>
          </div>
        </div>
      {
        /*
        <Typography variant="body1">
          This should be the UserDetail view of the PhotoShare app. Since
          it is invoked from React Router the params from the route will be
          in property match. So this should show details of user:
          {this.props.match.params.userId}. You can fetch the model for the
          user from window.cs142models.userModel(userId).
        </Typography>
        */
      }
      </Router>
    );
  }
}

export default UserDetail;

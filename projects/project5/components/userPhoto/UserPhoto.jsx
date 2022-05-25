import React from 'react';
import {List, ListItem} from '@material-ui/core';
import {HashRouter as Router, Link} from 'react-router-dom';
import './UserPhoto.css';


/**
 * Define UserPhoto, a React componment of CS142 project #5
 */
class UserPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  photoPath() {
      let relPath = this.props.photo.file_name;
      return "images/" + relPath;
  }

  photoUploadTime() {
      return (
          <p className="card-title  opacity-50 photo-upload-text">
            {this.props.photo.date_time}
          </p>
      );
  }

  photoCommentItem(comment) {
      let userId = comment.user._id;

      return (
        <p className="card-text">
          <Link to={"/users/" + userId}>
            <span className="fw-bold comment-user">
              {comment.user.first_name + " " + comment.user.last_name + ": "}
            </span>
          </Link>
          <span className="comment-text">
            {comment.comment}
          </span>
          <span className="opacity-50 ms-3 comment-upload-time">
            (At: {comment.date_time})
          </span>
        </p>
      );
  }

  photoComments() {
      let comments = this.props.photo.comments;

      if (!comments)
        return (
            <div></div>
        );

      return (
        <List component="div">
          {comments.map((comment) =>
            <ListItem divider={false} key={comment._id}>
              {this.photoCommentItem(comment)}
            </ListItem>
          )}
        </List>
      );
  }

  render() {
    return (
        <div className="card user-photo-image" >
          <img src={this.photoPath()} className="card-img-top" />
          <div className="card-body">
            {this.photoUploadTime()}
            {this.photoComments()}
          </div>
        </div>
    );
  }
}

      //<Router>
      //</Router>

export default UserPhoto;

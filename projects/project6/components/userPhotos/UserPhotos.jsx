import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import UserPhoto from '../userPhoto/UserPhoto';
import './UserPhotos.css';
import fetchModel from '../../lib/fetchModelData.js';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos : [], };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let userId = this.props.match.params.userId;
    // Async call to server
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        let photos = response['data'];
        this.setState({ photos : photos });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <List component="div">
        {
          this.state.photos.map((photo) =>
              <ListItem divider={false} key={photo._id}>
                <UserPhoto photo={photo}/>
              </ListItem>
          )
        }
      </List>
    );
  }
}


export default UserPhotos;

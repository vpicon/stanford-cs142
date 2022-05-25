import React from 'react';
import './Header.css';

/**
 * Define Header, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cs142-header">
        <h1>Cool Stuff</h1>
      </div>
    );
  }
}

export default Header;

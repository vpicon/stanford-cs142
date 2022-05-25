import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Example from './components/example/Example';
import States from './components/states/States';

class P5 extends React.Component {
  constructor(props) {
    super(props);
  }

  links() {
    return (
      <nav>
        A
      </nav>
    );
  }


  render() {
    return (
      <React.Fragment>
        <Router>
          <Link to="/states">States</Link>
          <Link to="/example">Example</Link>
          <Route path="/states" component={States} />
			  	<Route path="/example" component={Example} />
        </Router>
      </React.Fragment>
    );
  }
}

          //{this.links()}
          //{this.view()}

ReactDOM.render(
  <P5/>,
  document.getElementById('reactapp'),
);

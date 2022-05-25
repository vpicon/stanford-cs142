import React from 'react';
import ReactDOM from 'react-dom';

import Example from './components/example/Example';
import States from './components/states/States';

class P4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewOnExample: true,
    };
  }

  buttonText() {
    if (this.state.viewOnExample)
      return "Switch to States";
    else
      return "Switch to Example";
  }

  handleChangeView = (event) => {
    this.setState({viewOnExample: !this.state.viewOnExample});
  }

  render() {
    return (
      <div>
        <button onClick={(event) => this.handleChangeView(event)}>{this.buttonText()}</button>
        <div className="view">
          {this.state.viewOnExample ? <Example/> : <States/>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <P4/>,
  document.getElementById('reactapp'),
);

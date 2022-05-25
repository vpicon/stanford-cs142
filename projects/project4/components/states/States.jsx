import React from 'react';
import './States.css';
import Header from '../header/Header.jsx';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.statesList = window.cs142models.statesModel();

    this.state = {
      filter: '',
      filteredStates: this.statesList,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      filter: event.target.value,
      filteredStates: this.filterStates(this.statesList, event.target.value)
    });
  }


  filterStates(statesList, filterString) {
    return statesList.filter((st) =>
      st.toUpperCase().includes((filterString.toUpperCase()))
    );
  }


  render() {
    return (
      <div>
        <Header/>
        
        <p>Input Filter: </p>
        <input className="filter-input" type="text"
          value={this.state.filter}
          onChange={(event) => {this.handleInputChange(event)}} />
        <ul>
          {this.state.filteredStates.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    );
  }
}

export default States;

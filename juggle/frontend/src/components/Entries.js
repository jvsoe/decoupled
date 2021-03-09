import React, { Component } from "react";
import { Button } from 'reactstrap';

class Entries extends Component {
  fetchEntries = () => {
    fetch("api/entries")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(entries => {
//        this.props.setAppState({
        this.props.setAppState({
          entries: entries,
          loaded: true
        })
      });
  }
  componentDidMount = () => {
    this.fetchEntries();
  }

  render = () => {
    return (
      <div>
        <ul>
          {this.props.state.entries.map(entry => {
            return (
              <li key={entry.id}>
                {entry.text} - {entry.number}
              </li>
            );
          })}
        </ul>
        <div>
          <Button color="danger" onClick={this.fetchEntries}>Refresh!</Button>
        </div>
      </div>
    );
  }
}

export default Entries;
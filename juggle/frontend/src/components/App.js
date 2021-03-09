import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from 'reactstrap';


class App extends Component {
  state = {
    entries: [],
    loaded: false,
    placeholder: "Loading"
  };

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
        this.setState(() => {
          return {
            entries,
            loaded: true
          };
        });
      });
  }

  componentDidMount = () => {
    this.fetchEntries();
  }

  render = () => {
    return (
      <div>
        <ul>
          {this.state.entries.map(entry => {
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

export default App;

const container = document.getElementById("app");
render(<App />, container);
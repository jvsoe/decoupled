import React, { Component } from "react";
import { render } from "react-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <ul>
        {this.state.entries.map(entry => {
          return (
            <li key={entry.id}>
              {entry.text} - {entry.number}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
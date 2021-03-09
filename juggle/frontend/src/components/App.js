import React, { Component } from "react";
import { render } from "react-dom";
import Entries from './Entries'
//import { Navbar } from 'Navbar.js'


class App extends Component {
  state = {
    entries: [],
    loaded: false,
    placeholder: "Loading"
  };

  updateStateFromChild = (json) => {
    this.setState(json);
  }

  render = () => {
    return (
      <div className="app-wrap">
        <div className="entries-wrap">
          <span></span>
        </div>
        <div className="entries-wrap">
          <Entries setAppState={this.updateStateFromChild} entries={this.state.entries} />
        </div>
      </div>
    );
  }
}
// <Entries set_app_state={this.setState} parent_state={this.state} />
export default App;

const container = document.getElementById("app");
render(<App />, container);
'use strict';
import React, { Component } from "react";
import { render } from "react-dom";
import EntryTable from './EntryTable'
import Navbaren from './Navbar.js'


class App extends Component {
  state = {
    entries: [],
    entryDefinition: [],
    tableParams: {},
    loaded: false,
    placeholder: "Loading"
  };

//  appControl = () => {
//    state = this.state
//    setState = this.setState
//  }

  updateStateFromChild = (json) => {
    this.setState(json);
  }

  render = () => {
    return (
      <div className="app-wrap">
        <div className="entries-wrap">
          <Navbaren />
        </div>
        <div className="entries-wrap">
          <EntryTable setAppState={this.updateStateFromChild} state={this.state} />
        </div>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
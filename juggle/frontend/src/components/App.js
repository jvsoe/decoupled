'use strict';
import React, { Component } from "react";
import { render } from "react-dom";
import EntryTable from './EntryTable';
import Navbaren from './Navbar.js';
import EntryForm from './EntryForm.js';


class App extends Component {
  state = {
    entries: [],
    entryFormData: {},
    entryDefinition: [], // Columns - not used
    entryFormDefinition: {},
    tableParams: {},
    loaded: false,
    placeholder: "Loading"
  };
  settings = {
    entryFormId: 'entry-form',
  }

//  appControl = () => {
//    state = this.state
//    setState = this.setState
//  }

  updateStateFromChild = (json) => {
    this.setState(json);
  }

  render = () => {
    return (
      <div className="app-wrap" style={{padding: "5px"}}>
        <div className="navbar-wrap">
          <Navbaren />
        </div>
        <div className="entries-wrap" style={{padding: "5px"}}>
          <EntryTable setAppState={this.updateStateFromChild} state={this.state} settings={this.settings}/>
        </div>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
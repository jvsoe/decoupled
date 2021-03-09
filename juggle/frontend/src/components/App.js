import React, { Component } from "react";
import { render } from "react-dom";
import Entries from './Entries'
import Navbaren from './Navbar.js'


class App extends Component {
  state = {
    entries: [],
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
          <Entries setAppState={this.updateStateFromChild} state={this.state} />
        </div>
      </div>
    );
  }
}
// <Entries set_app_state={this.setState} parent_state={this.state} />
export default App;

const container = document.getElementById("app");
render(<App />, container);
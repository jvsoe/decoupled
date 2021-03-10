import React, { Component } from "react";
import { Button } from 'reactstrap';
import SmartDataTable from 'react-smart-data-table'

import Entry from './Entry.js'


class EntryTable extends Component {
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
        this.props.setAppState({
          entries: entries.entries,
          entryDefinition: entries.fields_to_names,
          loaded: true
        })
      });
  }
  componentDidMount = () => {
    this.fetchEntries();
  }

  render = () => {
    console.log('this.props.state.entries', this.props.state.entries)
    return (
      <div>
        <div className="the-table">
          <SmartDataTable
            data={this.props.state.entries}
            name="test-table"
            className="ui compact selectable table"
            {...this.props.state.tableParams}
            sortable
          />
        </div>
        <Button color="danger" onClick={this.fetchEntries}>Refresh!</Button>
      </div>
    );
  }
}

export default EntryTable;
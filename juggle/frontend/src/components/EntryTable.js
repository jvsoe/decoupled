import React, { Component } from "react";
import { Button } from 'reactstrap';
import SmartDataTable from 'react-smart-data-table'

import EntryForm from './EntryForm.js'


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
          entryDefinition: entries.columns,
          entryFormDefinition: entries.entry_form_fields,
          loaded: true
        })
      });
  }
  componentDidMount = () => {
    this.fetchEntries();
  }

//  const onRowClick = (event, { rowData, rowIndex, tableData }) => {
//    // The following results should be identical
//    console.log(rowData, tableData[rowIndex])
//  }

  render = () => {
    console.log('this.props.state.entries', this.props.state.entries)
    return (
      <div>
        <div className="form-wrap">
          <EntryForm
            state={this.props.state}
            submitFunc={this.fetchEntries}
            setAppState={this.props.setAppState}
            settings={this.props.settings} />
        </div>
        <br></br>
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
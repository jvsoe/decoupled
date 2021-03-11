import React, { Component } from "react";
import { Button } from 'reactstrap';
import SmartDataTable from 'react-smart-data-table'

import EntryForm from './EntryForm.js'
import EntryModal from './EntryModal.js'


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
  toggle = () => this.props.setAppState({modal: !this.props.state.modal});
  onRowClick = (event, { rowData, rowIndex, tableData }) => {
    // The following results should be identical
    console.log(rowData, tableData[rowIndex])
    this.props.setAppState({selectedEntry: rowData})
    this.toggle()
  }

  render = () => {
    console.log('this.props.state.entries', this.props.state.entries)
    return (
      <div>
        <EntryForm
          state={this.props.state}
          setAppState={this.props.setAppState}
          formId={this.props.settings.entryFormId}
          fetchEntries={this.fetchEntries} />

        <EntryModal
          state={this.props.state}
          toggle={this.toggle}
          fetchEntries={this.fetchEntries}
          formId={this.props.settings.entryModalFormId} />

        <br></br>
        <div className="the-table">
          <SmartDataTable
            data={this.props.state.entries}
            name="test-table"
            className="ui compact selectable table"
            onRowClick={this.onRowClick}
            sortable
            {...this.props.state.tableParams}
          />
        </div>
        <Button color="danger" onClick={this.fetchEntries}>Refresh!</Button>
      </div>
    );
  }
}

export default EntryTable;
'use strict';
import React, { Component } from 'react';
import EntryForm from './EntryForm.js'
import {
  Modal, ModalBody, ModalFooter,
  ModalHeader, Button
} from 'reactstrap';

import helpers from '../utils.js'

class EntryModal extends Component {

  submitForm = (method) => {
    let formElement = document.getElementById(this.props.formId)
    if (!(formElement.checkValidity())) { // If user input is invalid, display it
      if (['PUT', 'POST'].includes(method)) {
        formElement.reportValidity();
        return
      }
    }
    // Send request and refresh table
    let postFunctions = [
      this.props.fetchEntries,
      this.props.toggle,
    ]
    helpers.sendEntryRequest(formElement, method, postFunctions);
  }

  submitUpdate = () => {
    this.submitForm("PUT");
  }

  submitDelete = () => {
    this.submitForm("DELETE");
  }

  render() {
    return (
      <div className="entry-modal-wrap">
        <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} className="entry-modal">
          <ModalHeader toggle={this.props.toggle}>Entry {this.props.state.selectedEntry.id || ''}</ModalHeader>
          <ModalBody>
            <EntryForm
              state={this.props.state}
              setAppState={this.props.setAppState}
              formId={this.props.formId} />

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submitUpdate}>Update</Button>
            <Button color="danger" onClick={this.submitDelete}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

  export default EntryModal;
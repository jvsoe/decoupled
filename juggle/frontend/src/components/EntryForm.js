'use strict';
import React, { Component, useState } from "react";
import {
  Form, FormGroup, Button, Label,
  Col, Input, FormText, Container, Row,
  Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';

import helpers from '../utils.js'

class EntryForm extends Component {
  inputType = (field_type) => {
    let test = {
      "string": "text",
      "integer": "number",
      "date": "datetime-local",
      "datetime": "datetime-local",
    }
    return test[field_type] || 'text';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form = event.target
    helpers.sendEntryRequest(form, 'POST');
    this.props.fetchEntries();
  }

  render() {
    const inModal = this.props.formId.includes('modal')
    const idInput = <Input type="hidden" name="id" value={this.props.state.selectedEntry.id || ''} />
    const idFieldOrNot = inModal ? idInput : '';
    const buttonOrNot = inModal ? '' : <Button>Submit</Button>;
    console.log(this.props.formId, inModal, idInput, idFieldOrNot, buttonOrNot)
    return (
      <div className="entry-form-wrap">
        <Form
          id={this.props.formId}
          onSubmit={this.handleSubmit}
          className="entry-form">

          {idFieldOrNot}
          {Object.entries(this.props.state.entryFormDefinition).map(([field, meta], index) => {
            return (
              <FormGroup key={field}>
                <Label for={field+'ID'}>{meta.title}</Label>
                <Col xl="4" md="6" sm="8">
                  <Input
                    type={this.inputType(meta.type)}
                    name={field}
                    id={field+'ID'}
                    placeholder={inModal ? this.props.state.selectedEntry[field] : `Enter ${meta.title}...`}
                    defaultValue={inModal ? this.props.state.selectedEntry[field] : ''}
                    required
                    />
                </Col>
              </FormGroup>
            )
          })}
        {buttonOrNot}
        </Form>
      </div>
    )
  }
}

export default EntryForm;
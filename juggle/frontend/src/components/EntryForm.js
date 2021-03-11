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
    let postFunctions = [this.props.fetchEntries]
    helpers.sendEntryRequest(form, 'POST', postFunctions);
  }

  inModal = () => {
    return this.props.formId.includes('modal')
  }

  valuesForEntryInput = (field, meta) => {
    let placeholder = `Enter ${meta.title.toLowerCase()}...`
    let defaultValue = ''
    if (this.inModal()) {
      placeholder = this.props.state.selectedEntry[field]
      defaultValue = this.props.state.selectedEntry[field]
    }
    return {placeholder: placeholder, defaultValue: defaultValue}
  }

  render() {
    const idInput = <Input type="hidden" name="id" value={this.props.state.selectedEntry.id || ''} />
    const idFieldOrNot = this.inModal() ? idInput : '';
    const buttonOrNot = this.inModal() ? '' : <Button>Submit</Button>;
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
                    {...this.valuesForEntryInput(field, meta)}
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
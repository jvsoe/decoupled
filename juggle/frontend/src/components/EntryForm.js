'use strict';
import React, { Component, useState } from "react";
import {
  Form, FormGroup, Button, Label,
  Col, Input, FormText, Container, Row,
  Modal, ModalBody, ModalFooter, ModalHeader
  } from 'reactstrap';


class EntryForm extends Component {
  state ={
    modal: false
  }
  setModal = (setting) => {
    this.setState({modal: setting})
  }
  // const [modal, setModal] = useState(false);

  toggle = () => setModal(!this.state.modal);

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
    let formInputs = Array.from(form.getElementsByTagName('input'))
    let data = Object.fromEntries(formInputs.map(entry => [entry.name, entry.value]))
    fetch('api/entries', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log('data:', data);
      this.props.submitFunc();
    })
  }

  render() {
    return (
      <div className="form-and-modal">
        <Form id={this.props.settings.entryFormId} onSubmit={this.handleSubmit}>
          {Object.entries(this.props.state.entryFormDefinition).map(([field, meta], index) => {
            return (
              <FormGroup key={field}>
                <Label for={field+'ID'}>{meta.title}</Label>
                <Col xl="4" md="6" sm="8">
                  <Input
                    type={this.inputType(meta.type)}
                    name={field}
                    id={field+'ID'}
                    placeholder={meta.title} />
                </Col>
              </FormGroup>
            )
          })}
        <Button>Submit</Button>
        </Form>
        {true &&
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="entry-modal">
            <ModalHeader toggle={this.state.toggle}>Entry 101</ModalHeader>
            <ModalBody>
              Change or delete entry.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.state.toggle}>Update</Button>
              <Button color="danger" onClick={this.state.toggle}>Delete</Button>
            </ModalFooter>
          </Modal>
        }
      </div>
    )
  }
}

export default EntryForm;
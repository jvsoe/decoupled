import React, { Component } from "react";

class Entry extends Component {
  render = () => {
    console.log('this.props.rowEntry', this.props.rowEntry)
    console.log('this.props', this.props)
    return (
      <tr key={this.props.rowEntry.id}>
        {
          Object.entries(this.props.rowEntry).map((line, index) => (
            <td>{line[1]}</td>
          ))
        }
      </tr>
    )
  }
}

export default Entry;
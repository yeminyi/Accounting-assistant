import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class Record extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
    this.handleDelete.bind(this);
  }

  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleEdit(event) {
    event.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0)
    }
    RecordsAPI.update(this.props.record.id, record).then(
      response => {
        this.props.handleEditRecord(this.props.record, response.data);
        this.setState({edit: false});
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  handleDelete(event) {
    event.preventDefault();
    RecordsAPI.remove(this.props.record.id).then(
      response => this.props.handleDeleteRecord(this.props.record)
    ).catch(
      error => console.log(error.message)
    )
  }

  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button className="btn" onClick={this.handleToggle.bind(this)}><i className="fa fa-edit"></i><span></span></button>
          <button className="btn" 
            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(e) } } > 
              <i className="far fa-trash-alt"></i><span></span>
          </button>
        </td>
      </tr>
    );
  }

  recordForm() {
    return (
      <tr>
        <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
        <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
        <td>
          <button className="btn" onClick={this.handleEdit.bind(this)}><i className="fas fa-check"></i></button>
          <button className="btn" onClick={this.handleToggle.bind(this)}><i className="fas fa-times"></i></button>
        </td>
      </tr>
    );
  }

  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  record: PropTypes.object
}

import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      title: "",
      amount: ""
    }
  }

  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState((
      obj = {},
      obj["" + name] = event.target.value,
      obj
    ))
    
  }
  handleDateChange(date) {
    this.setState({
      date: date
    });
  }
  valid() {
    return this.state.date && this.state.title && this.state.amount
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      date: moment(this.state.date).format("DD/MM/YYYY"),
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    };
    
    RecordsAPI.create(data).then(
      response => {
        this.props.handleNewRecord(response.data);
        this.setState({
          date: new Date(),
          title: "",
          amount: ""
        })
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group mr-1">
          <DatePicker className="form-control"  placeholder="Date" name="date" 
              dateFormat="dd/MM/yyyy"
              value={this.state.date}
              selected={this.state.date}
              onChange={this.handleDateChange.bind(this)}
          />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" onChange={this.handleChange.bind(this)}  placeholder="Amount" name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}

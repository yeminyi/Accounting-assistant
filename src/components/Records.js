import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: [],
      isAsc:true,
    }
    this.compareBy.bind(this);
    this.handleSortClick.bind(this);
  }

  componentDidMount() {
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })
    ).catch(
      error => this.setState({
        isLoaded: true,
        error
      })
    )
  }

  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });
  }

  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
  }

  compareBy(key,isAsc) {

    return function (a, b) {
      
      if(isAsc){
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      }
      else{
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      }
         
    };
  }
 
  handleSortClick(key,isAsc) {
    let arrayCopy = [...this.state.records];
    arrayCopy.sort(this.compareBy(key,isAsc));
    this.setState({
      records: arrayCopy,
      isAsc:  this.state.isAsc===true ?false :true      
    });
  }

  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponent;

    if (error) {
      recordsComponent = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      recordsComponent =  <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>;
    } else {
      recordsComponent = (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th onClick={() => this.handleSortClick('date',this.state.isAsc)}>Date 
              <span className='fas fa-sort Head-sort-margin' ></span> 
              </th>
              <th onClick={() => this.handleSortClick('title',this.state.isAsc)}>Title
              <span className='fas fa-sort Head-sort-margin' ></span> 
              </th>
              <th onClick={() => this.handleSortClick('amount',this.state.isAsc)}>Amount 
              <span className='fas fa-sort Head-sort-margin' ></span> 
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) =>
              (<Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />)
            )}
          </tbody>
        </table>
      );
    }

    return (
      <div className="container">
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()} />
          <AmountBox text="Debit" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}

export default Records;

import React from 'react';
import Record from './Record';

function Records(props) {
  props = {
    records: [
      {"id":"1","date":"2019-06-23","title":"234","amount":1102},
      {"id":"2","date":"2019-01-31","title":"merewrrt","amount":12},
      {"id":"3","date":"2019-01-31","title":"11","amount":12}
    ]
  }

  return (
    <div>
     <h2>records</h2>
     <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
         {props.records.map((record)=><Record record={record}/>)}
        </tbody>
  
    </table>
    </div>
  );
}

export default Records;

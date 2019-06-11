import React from 'react';
  

function Record(props) {
  return (
    <tr>
      <td>{props.record.date}</td>
      <td>{props.record.title}</td>
      <td>{props.record.amount}</td>
    </tr>
  );
}

export default Record;

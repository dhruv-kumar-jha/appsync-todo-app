import React from 'react';

const Loading = (props) => {

  return (
    <div className="component--loading" style={props.style}>
      <div className="loader"></div>
      <p>{ props.message ? props.message : 'Loading data please wait...' }</p>
    </div>
  );

}

export default Loading;


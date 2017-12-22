import React from 'react';

const Item = (props) => {

  const { data: item } = props;

  return (
    <div className="item">
      <div className="title">{ item.name }</div>
      <div className="description">{ item.description }</div>
    </div>
  );

}

export default Item;

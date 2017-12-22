import React from 'react';
import Item from 'components/app/Item';



const List = (props) => {

  const { data: list } = props;

  return (
    <div className="list">
      <div className="title">{ list.name }</div>
      <div className="items">
        { list.items && list.items.length > 0 &&
          list.items.map( item => <Item key={item.id} data={ item } /> )
        }

        { list.items && list.items.length < 1 &&
          <div className="empty">No Item(s) has been added for this List.</div>
        }
      </div>
    </div>
  );

}

export default List;

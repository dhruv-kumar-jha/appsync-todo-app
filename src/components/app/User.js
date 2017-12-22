import React from 'react';
import { withRouter } from 'react-router'

const User = (props) => {

  const { id, name, email, lists } = props.data;

  const openUsersPage = () => {
    props.history.push(`/users/${ id }`);
  }

  return (
    <div className="user" onClick={ openUsersPage }>
      <div className="name">{ name }</div>
      <div className="email">{ email }</div>
      <div className="todos">Total Todos: <span>{ lists.length }</span></div>
    </div>
  );

}

export default withRouter(User);

import React from 'react';
import { NavLink } from "react-router-dom";

const Header = (props) => {

  return (
    <div className="component--header">
      <h1><NavLink to="/">Todo Application</NavLink></h1>
      <nav>
        <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
        <NavLink to="/users/create" activeClassName="active">Add New User</NavLink>
      </nav>
    </div>
  );

}

export default Header;


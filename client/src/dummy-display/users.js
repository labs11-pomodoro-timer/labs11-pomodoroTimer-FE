import React from "react";

const Users = props => {
  return <li className="character-list">{props.user.firstname}</li>;
};

export default Users;

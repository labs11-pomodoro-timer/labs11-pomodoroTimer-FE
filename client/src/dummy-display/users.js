import React from "react";

const Users = props => {
  return <li className="character-list">{props.user.name}</li>;
};

export default Users;

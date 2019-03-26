import React from "react";

import Users from "./users";

const UsersList = props => {
  return (
    <ul>
      {props.users.map(user => {
        return <Users key={user.name} user={user} />;
      })}
    </ul>
  );
};

export default UsersList;

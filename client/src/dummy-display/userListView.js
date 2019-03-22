import React from "react";
import { connect } from "react-redux";

import UsersList from "./userList";
// import actions
import { fetchUsers } from '../actions';


class UsersListView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // call our action
      this.props.fetchUsers();
  }

  render() {
    if (this.props.error) {
      // return something here to indicate that you are fetching data
      return <h1>{this.props.error}</h1>
    }
    return (
      <div>
          {this.props.isFetching ? (
          <h3>Fetching Users...</h3>
        ) : (
          <div className="CharactersList_wrapper">
          <UsersList users={this.props.users} />
        </div>
        )}
      </div>
    );
  }
}

// our mapStateToProps needs to have two properties inherited from state
// the characters and the fetching boolean
const mapStateToProps = ({users, error, isFetching}) => {
  return {
    users, 
    error,
    isFetching 
  };
};

export default connect(
  mapStateToProps,
  {
    /* action creators go here */
    fetchUsers
  }
)(UsersListView);

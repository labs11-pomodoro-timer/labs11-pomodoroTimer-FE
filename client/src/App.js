import React, { Component } from 'react';
import './App.css';

// testing bootstrap
import Button from 'react-bootstrap/Button';
import UserListView from "./dummy-display/userListView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Focus Timer</h1>
          {/* testing button from bootstrap */}
          <Button variant="primary">Primary</Button>
        </header>
        <div>
          <UserListView />
        </div>
      </div>
    );
  }
}

export default App;

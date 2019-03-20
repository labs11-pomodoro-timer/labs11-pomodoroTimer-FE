import React, { Component } from 'react';
import './App.css';

// testing bootstrap
import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Focus Timer</h1>
          {/* testing button from bootstrap */}
          <Button variant="primary">Primary</Button>
        </header>
      </div>
    );
  }
}

export default App;

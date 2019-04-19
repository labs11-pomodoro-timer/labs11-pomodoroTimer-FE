// User's slack avatar should be auto-populated or able to manually upload a pic

// Slack integration should be possible with on click authentication

// Free User will have access to 3 preset focus lengths

// Paid User will have option to customize their focus lengths and timer

// Notable cog wheel with drop-down menu functionality

// Pomodoro timer with countdown clock and start, stop, and reset functionality

import React from "react";

import { connect } from "react-redux";
import { timer, stopTimer } from "../../actions/index.js";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import SlackButton from "../button/slackButton.js";
import axios from "axios";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      countdown: localStorage.getItem("time"),
      customTime: null
    };

    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    // this.props.getTime(); // pass id into getTime
    this.time = setInterval(this.timers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  // componentDidUpdate() {

  //     console.log('timers');
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  stopTime = () => {
    this.props.stopTimer(localStorage.getItem("id"));
    localStorage.removeItem("time");
    this.setState({
      countdown: 0
    });
  };

  timers = () => {
    const count = this.state.countdown - 1;
    if (count >= 0) {
      this.setState({ countdown: count });
    }
  };

  formatTime = () => {
    const countdown = this.state.countdown;
    const minutesOutput = Math.floor(
      (countdown / 60).toString().padStart(2, "0")
    );
    const secondsOutput = (this.state.countdown % 60)
      .toString()
      .padStart(2, "0");
    return `${minutesOutput}:${secondsOutput}`;
  };

  submitTime = time => {
    axios
      .put(
        `https://focustimer-labs11.herokuapp.com/api/timer/startTimer/${localStorage.getItem(
          "id"
        )}/${time}`,
        {
          countdown: localStorage.setItem("time", this.state.customTime)
        }
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    window.location.reload();
  };

  render() {
    return (
      <div className="profile">
        <div className="timer-btns">
          <button
            className="focus-btn"
            onClick={() =>
              this.props.timer("focus", localStorage.getItem("id"))
            }
          >
            Focus 25
          </button>
          <button
            className="focus-btn"
            onClick={() => this.props.timer("long", localStorage.getItem("id"))}
          >
            Long 15
          </button>
          <button
            className="focus-btn"
            onClick={() =>
              this.props.timer("short", localStorage.getItem("id"))
            }
          >
            Short 5
          </button>
        </div>
        <div id="time-left" className="display">
          {this.formatTime(this.state.countdown)}
        </div>
        {localStorage.getItem("complete", true) ? (
          <div>
            <Form id="time-left" className="custom-time">
              <Form.Control
                type="number"
                min="0"
                max="86400"
                onChange={this.handleChange}
                name="customTime"
                placeholder="Time in Seconds"
                value={this.state.customTime}
              />
            </Form>
            <button
              className="start-btn"
              onClick={() => this.submitTime(this.state.customTime)}
            >
              Start
            </button>
            <button className="start-btn stop-btn" onClick={this.stopTime}>
              Stop
            </button>
          </div>
        ) : (
          <div>
            <button
              className="start-btn"
              onClick={() => this.submitTime(this.state.customTime)}
            >
              Start
            </button>
            <button className="start-btn stop-btn" onClick={this.stopTime}>
              Stop
            </button>
          </div>
        )}
        <SlackButton />
      </div>
    );
  }
}

const mapStateToProps = ({ timerStarted, stopTimes }) => {
  return {
    timerStarted,
    stopTimes
  };
};

export default connect(
  mapStateToProps,
  {
    /* action creators go here */
    timer,
    stopTimer
  }
)(Profile);

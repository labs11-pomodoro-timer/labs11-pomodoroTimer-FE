// User's slack avatar should be auto-populated or able to manually upload a pic

// Slack integration should be possible with on click authentication

// Free User will have access to 3 preset focus lengths

// Paid User will have option to customize their focus lengths and timer

// Notable cog wheel with drop-down menu functionality

// Pomodoro timer with countdown clock and start, stop, and reset functionality

import React from "react";

import { connect } from "react-redux";
import { timer } from '../../actions/index.js';

class Profile extends React.Component {

    startfocus = () => {
        this.props.timer('focus');
    }

    startShort = () => {
        this.props.timer('short');
    }

    startLong = () => {
        this.props.timer('long');
    }

    render() {
        return (
            <div className="Profile">
               <div className="timer-btns">
                    <button className="focus-btn" onClick={this.startfocus} >Focus 25</button>
                    <button className="focus-btn" onClick={this.startShort} >Short 5</button>
                    <button className="focus-btn" onClick={this.startLong} >Long 15</button>
               </div>
               <button className="start-btn">Start</button>
            </div>
        )
    }
}

const mapStateToProps = ({ timerStarted }) => {
    return {
        timerStarted
    };
  };
  
  export default connect(
    mapStateToProps,
    {
      /* action creators go here */
      timer
    }
  )(Profile);
// User's slack avatar should be auto-populated or able to manually upload a pic

// Slack integration should be possible with on click authentication

// Free User will have access to 3 preset focus lengths

// Paid User will have option to customize their focus lengths and timer

// Notable cog wheel with drop-down menu functionality

// Pomodoro timer with countdown clock and start, stop, and reset functionality

import React from "react";

import { connect } from "react-redux";
import { timer, getTime } from '../../actions/index.js';
import Button from 'react-bootstrap/Button';
import SlackButton from '../button/slackButton.js';

class Profile extends React.Component {
    constructor() {
        super();
    
        this.state = {
          countdown: localStorage.getItem('time')
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

    componentDidUpdate() {
        
        console.log('timers');
    }

    stopTime = () => {
        this.setState({
            countdown: 0
        })
    }

    timers = () => {
        const count = this.state.countdown - 1;
        if (count >= 0) {
          this.setState({ countdown: count });
      }
    }
    
    formatTime = () => {
        const countdown = this.state.countdown;
        const minutesOutput = Math.floor(
            (countdown / 60).toString().padStart(2, "0")
        );
        const secondsOutput = (this.state.countdown % 60).toString().padStart(2, "0");
        return `${minutesOutput}:${secondsOutput}`;
    }


    render() {
        return (
            <div className="Profile">
                <div className="timer-btns">
                    <Button className="focus-btn" onClick={() => this.props.timer('focus')} variant="secondary" >
                        Focus 25
                    </Button>
                    <Button className="focus-btn" onClick={() => this.props.timer('long')} variant="secondary" >
                        Long 15
                    </Button>
                    <Button className="focus-btn" onClick={() => this.props.timer('short')} variant="secondary" >
                        Short 5
                    </Button>

                </div>
                <div id="time-left" className="display">
                    {this.formatTime(this.state.countdown)}
                </div>
                <Button className="start-btn" variant="secondary" >Start</Button>
                <Button className="start-btn" variant="secondary" onClick={this.stopTime}>Stop</Button>
                <SlackButton />
            </div>
        )
    }
}

const mapStateToProps = ({ timerStarted, gettingTime }) => {
    return {
        timerStarted,
        gettingTime
    };
};

export default connect(
    mapStateToProps,
    {
        /* action creators go here */
        timer,
        getTime,
    }
)(Profile);
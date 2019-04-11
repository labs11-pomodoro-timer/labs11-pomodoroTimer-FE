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

class Profile extends React.Component {

    componentDidMount() {
        // this.props.getTime(); // pass id into getTime
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
                <Button className="start-btn" variant="secondary" >Start</Button>
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
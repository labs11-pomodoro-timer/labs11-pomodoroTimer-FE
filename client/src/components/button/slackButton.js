import React from 'react';

const SlackButton = () => {
    return (
        <div>
            <a href={`https://slack.com/oauth/authorize?client_id=586899066608.590399489303&scope=bot,commands,users.profile:write,dnd:write,dnd:read,channels:write,groups:write,mpim:write,im:write&state=${localStorage.getItem('email')}`}><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        </div>
    );
}
export default SlackButton;
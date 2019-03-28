import React from 'react';

const SlackButton = () => {
    return (
        <div>
            <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=586899066608.590399489303"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
        </div>
    );
}

export default SlackButton;

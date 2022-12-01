const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");

const developerSecretKey = core.getInput('DEVELOPER_SECRET_KEY', {required: true});
const titleId = core.getInput('TITLE_ID', {required: true});

async function run()
{
    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;
    
    core.notice(developerSecretKey);
    core.notice(titleId);
}

run();
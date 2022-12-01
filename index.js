const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");

const developerSecretKey = core.getInput('developer-secret-key', {required: true});
const titleId = core.getInput('title-id', {required: true});

async function run()
{
    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;
    
    core.debug(developerSecretKey);
    core.notice(titleId);
    console.log(titleId);
}

run();
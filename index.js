const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");
const playFabAuthentication = require("playfab-sdk/Scripts/PlayFab/PlayFabAuthentication");

const developerSecretKey = core.getInput('developer-secret-key', {required: true});
const titleId = core.getInput('title-id', {required: true});

async function run()
{
    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;
    
    console.log('Given developer secret key: ${developerSecretKey}');
    console.log('Given title id: ${titleId}');

    const entityToken = playFabAuthentication.GetEntityToken();
    
    console.log('entity token: ' + entityToken);
}

run();
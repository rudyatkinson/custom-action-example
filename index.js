const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");
const playFabAuthentication = require("playfab-sdk/Scripts/PlayFab/PlayFabAuthentication");
const playFabClient = require("playfab-sdk/Scripts/PlayFab/PlayFabClient");

const developerSecretKey = core.getInput('developer-secret-key', {required: true});
const titleId = core.getInput('title-id', {required: true});

async function run()
{
    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;
    
    console.log('Given developer secret key: ${developerSecretKey}');
    console.log('Given title id: ${titleId}');

    var getEntityTokenRequest = {};

    const entityToken = playFabAuthentication.GetEntityToken(getEntityTokenRequest, GetEntityTokenCallback);
    
    console.log('entity token: ' + entityToken == null);
}

function GetEntityTokenCallback(error, result) {
    console.log(error);
    console.log(result);
}

run();
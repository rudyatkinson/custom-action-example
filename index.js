const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");
const playFabAuthentication = require("playfab-sdk/Scripts/PlayFab/PlayFabAuthentication");
const playFabCloudScript = require("playfab-sdk/Scripts/PlayFab/PlayFabCloudScript");

const developerSecretKey = core.getInput('developer-secret-key', {required: true});
const titleId = core.getInput('title-id', {required: true});

async function run()
{
    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;

    var getEntityTokenRequest = {};
    playFabAuthentication.GetEntityToken(getEntityTokenRequest, GetEntityTokenCallback);
}

function GetEntityTokenCallback(error, result) {
    if(error == null){
        console.log("GetEntityToken succeeded.");
    }
    else{
        console.log("Get an error during GetEntityToken\n"+ error);
    }

    var entityToken = result.data["EntityToken"];

    var listHttpFunctionsRequest = { EntityToken: entityToken };
    playFabCloudScript.ListHttpFunctions(listHttpFunctionsRequest, ListHttpFunctionsCallback);
}

function ListHttpFunctionsCallback(error, result) {
    console.log(error);
    console.log(result);
}

run();
const core = require('@actions/core');
const playFabServer = require("playfab-sdk/Scripts/PlayFab/PlayFabServer");
const playFabAuthentication = require("playfab-sdk/Scripts/PlayFab/PlayFabAuthentication");
const playFabCloudScript = require("playfab-sdk/Scripts/PlayFab/PlayFabCloudScript");
const fetch = require('node-fetch');
const fs = require("fs");

const developerSecretKey = core.getInput('developer-secret-key', { required: true });
const titleId = core.getInput('title-id', { required: true });
const subscriptionId = core.getInput('subscription-id', { required: true });
const resourceGroup = core.getInput('resource-group', { required: true });
const appName = core.getInput('app-name', { required: true });
const azureAuthorizationKey = core.getInput('azure-authorization-key', { required: true });

var accessData;

async function run() {
    fs.readFile("./accessToken.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("accessToken.json read failed:", err);
            return;
        }
        console.log("File data:", jsonString);
        accessData = JSON.parse(jsonString);

        console.log('accessToken: ' + accessData.accessToken);
        GetAzureFunctionList(accessData);
    });

    playFabServer.settings.developerSecretKey = developerSecretKey;
    playFabServer.settings.titleId = titleId;

    var getEntityTokenRequest = {};
    playFabAuthentication.GetEntityToken(getEntityTokenRequest, GetEntityTokenCallback);
}

function GetEntityTokenCallback(error, result) {
    if (error == null) {
        console.log("GetEntityToken succeeded.");
    }
    else {
        console.log("Get an error during GetEntityToken\n" + error);
    }

    var entityToken = result.data["EntityToken"];

    var listHttpFunctionsRequest = { EntityToken: entityToken };
    playFabCloudScript.ListHttpFunctions(listHttpFunctionsRequest, ListHttpFunctionsCallback);
}

function ListHttpFunctionsCallback(error, result) {
    if (error == null) {
        console.log("ListHttpFunction succeeded.");
    }
    else {
        console.log("Get an error during ListHttpFunction\n" + error);
    }

    var functions = result.data["Functions"];

    functions.forEach(func => {
        console.log(func);
    });
}

function GetAzureFunctionList(accessTokenData) {
    var urlPath = 'https://management.azure.com/subscriptions/' + subscriptionId + '/resourceGroups/' + resourceGroup + '/providers/Microsoft.Web/sites/' + appName + '/functions?api-version=2022-03-01';
    fetch(urlPath, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + accessTokenData.accessToken
        }
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)));
}

run();
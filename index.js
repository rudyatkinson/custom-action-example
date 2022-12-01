const core = require('@actions/core');

const message = core.getInput('message', {required: true});
 

async function run()
{
    try {
        core.notice(message);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
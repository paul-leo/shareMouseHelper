module.exports = async function restart(programName) {
    await killMac(programName);
    await sleep(1000)
    await startMac(programName);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function killMac(programName) {
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        exec(`pkill -x ${programName.split('.')[0]}`, (err, stdout, stderr) => {
            if (err) {
                resolve(true);
            } else {
                resolve(stdout);
            }
        });
    });
}

function startMac(programName) {
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        exec(`open -a /Applications/${programName}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}
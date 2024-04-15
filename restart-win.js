const { existsSync } = require('fs');



// let millisecondsUntilNext = getMillisecondsToNextHalfHourOrHour();
// console.log("距离下一个30分钟或整点还有多少毫秒：", millisecondsUntilNext);
module.exports = async function restart(programName) {
    await killWin(programName);
    await startWin(programName);
}

function killWin(programName) {
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        exec(`taskkill /f /im ${programName}`, (err, stdout, stderr) => {
            if (err) {
                resolve(true);
            } else {
                resolve(stdout);
            }
        });
    });
}

function findProgramWin(programName) {
    const parentPath = [
        'C:\\Program Files\\ShareMouse\\',
        'C:\\Program Files (x86)\\ShareMouse\\',
    ].find((path) => {
        if (existsSync(`${path}${programName}`)) {
            return `${path}${programName}`;
        }
    });
    return parentPath ?parentPath + programName : null;
}
/**
 * 启动windows 程序
 * @param {*} programName 
 * @returns 
 */
function startWin(programName) {
    const programPath = findProgramWin(programName);
    if (!programPath) {
        console.log('未找到程序');
        return;
    }
    return new Promise((resolve, reject) => {
        const exec = require('child_process').exec;
        exec(`start ${programName}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}



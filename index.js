

function getMillisecondsToNextHalfHourOrHour() {
    let now = new Date(); // 获取当前时间
    let minutes = now.getMinutes(); // 获取当前的分钟数
    let nextTime;

    if (minutes < 30) {
        // 如果当前分钟小于30，则下一个时间点是当前小时的30分钟
        nextTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            30,
            0,
            0
        );
    } else {
        // 否则，下一个时间点是下一个小时的整点
        nextTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours() + 1,
            0,
            0,
            0
        );
    }

    // 计算差值（毫秒）
    let millisecondsToNext = nextTime.getTime() - now.getTime();

    return millisecondsToNext;
}

function restart() {
    if(process.platform === 'win32') {
      const restartWin = require('./restart-win');
      restartWin('ShareMouse\\ShareMouse.exe');
    }
    else {
      const restartMac = require('./restart-mac');
      restartMac('ShareMouse.app');
    }
}

function jihua() {
  let millisecondsUntilNext = getMillisecondsToNextHalfHourOrHour();
  console.log("距离下一个30分钟或整点还有多少毫秒：", millisecondsUntilNext);
  restart();
  setTimeout(() => {
      console.log('重启');
      restart();
      jihua();
  }, millisecondsUntilNext);
}

jihua();

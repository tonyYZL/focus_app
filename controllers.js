let timeId;

function timerController(title, setTime, setBtnTitle, setSeconds) {
  if (title === "開始專注") {
    setTime(0);
    setSeconds(0);
    // setMinutes(0);
    //用現在的時間紀錄秒數，避免螢幕關閉時停止計時
    let startTime = Date.now();
    timeId = setInterval(() => {
      setTime(parseInt((Date.now() - startTime) / 1000));
    }, 100);
    setBtnTitle("休息一下");
  } else {
    if (timeId) {
      clearInterval(timeId);
    } else {
      console.log("error");
    }
    setBtnTitle("開始專注");
  }
}

function timerStop() {
  if (timeId) {
    clearInterval(timeId);
  }
}

export default {
  timerController,
  timerStop,
};

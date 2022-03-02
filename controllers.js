import firebase from 'firebase';

let timeId,times;

function timerController(title, setTime, setBtnTitle, setSeconds) {
  if (title === "開始專注") {
    times=0;
    setTime(0);
    setSeconds(0);
    // setMinutes(0);
    //用現在的時間紀錄秒數，避免螢幕關閉時停止計時
    let startTime = Date.now();
    timeId = setInterval(() => {
      times+=1;
      setTime(parseInt((Date.now() - startTime) / 1000));
    }, 100);
    setBtnTitle("休息一下");
  } else {
    if (timeId) {
      clearInterval(timeId);
      const db = firebase.firestore();
      const addtimeRef = db.collection('time');
      const addtime = { time: Math.floor(times/10) };
      addtimeRef.add(addtime);
      times=0;
    } else {
      console.log("error");
    }
    setBtnTitle("開始專注");
  }
}

function timerStop() {
  if (timeId) {
    const db = firebase.firestore();
    const addtimeRef = db.collection('time');
    const addtime = { time: Math.floor(times/10) };
    addtimeRef.add(addtime);
    times=0;
    clearInterval(timeId);
  }
}

async function totaltime()
{
  const db = firebase.firestore().collection('time');
  const timeRef = await db.get();
  let total=0;
  timeRef.forEach((doc) => {
      total+=doc.data().time;
  });
  console.log(total);
  return total;
}

export default {
  timerController,
  timerStop,
  totaltime,
};

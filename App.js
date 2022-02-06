import React, { useRef, useState, useEffect } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

let timeId;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [state, setState] = useState("");
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [btnTitle, setBtnTitle] = useState("Start studying");

  //監測程式的狀態(有沒有被關掉)
  let a, b;
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }
      if (nextAppState == "inactive") {
        a = new Date();
      }
      if (nextAppState == "background") {
        b = new Date();
        if (b - a < 100) {
          console.log("lock screen");
        } else {
          setState("leave app");
          console.log("leave app");
        }
      }
      if (nextAppState == "active") {
        a = 0;
        b = 0;
      }
      appState.current = nextAppState;
    });
  }, []);

  //被關掉的話就停止計時
  useEffect(() => {
    if (state === "leave app") {
      if (timeId) {
        clearInterval(timeId);
      }
      setBtnTitle("Start studying");
      setState("");
      console.log("stop");
    }
  }, [state]);

  //計時器開始 or 結束
  function timerController() {
    if (btnTitle === "Start studying") {
      setTime(0);
      setSeconds(0);
      // setMinutes(0);
      //用現在的時間紀錄秒數，避免螢幕關閉時停止計時
      let startTime = Date.now();
      timeId = setInterval(() => {
        setTime(parseInt((Date.now() - startTime) / 1000));
      }, 100);
      setBtnTitle("Take a break");
    } else {
      if (timeId) {
        clearInterval(timeId);
      } else {
        console.log("error");
      }
      setBtnTitle("Start studying");
    }
  }

  //將 time 轉換成畫面顯示的時、分、秒
  useEffect(() => {
    setSeconds(time % 60);
    if (!(time % 60) && time != 0) {
      setMinutes((minutes) => minutes + 1);
    }
  }, [time]);

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHours((hours) => hours + 1);
    }
  }, [minutes]);
  //--------------------------------

  //花的動畫
  const lottieRef = useRef(null);
  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);
  //--------------------------------

  return (
    <View style={styles.container}>
      {/* 花的動畫 */}
      <LottieView
        style={{ height: 400, marginBottom: 30, marginLeft: -6 }}
        source={require("./assets/70942-orange-plant.json")}
        ref={lottieRef}
        speed={1}
        loop={true}
        renderMode={"SOFTWARE"}
      />

      {/* 記錄到的總秒數 方便觀察所以先留著*/}
      <Text>{time}</Text>

      {/* 轉換過格式的時間 */}
      <Text style={styles.timerText}>
        {hours < 10 && hours > 0 ? "0" : ""}
        {hours ? hours + ":" : ""}
        {minutes < 10 ? "0" : ""}
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </Text>

      <Text>{"\n"}</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={timerController}
        style={{
          backgroundColor: btnTitle === "Start studying" ? "#FF9F00" : "#de7d00",
          width: 200,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 20 }}>{btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  timerText: {
    fontSize: 60,
    fontWeight: "100",
    letterSpacing: 5,
  },
});

export default App;

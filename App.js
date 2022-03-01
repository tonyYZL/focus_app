import React, { useRef, useState, useEffect } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Style from "./style";
import LottieView from "lottie-react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

let timeId;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [state, setState] = useState("");
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [btnTitle, setBtnTitle] = useState("開始專注");

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
      Alert.alert(
        "已自動停止計時",
        "\n你剛才好像分心了哦，再堅持久一點，你可以的！！",
        [{ text: "沒問題！" }]
      );

      setBtnTitle("開始專注");
      setState("");
      console.log("stop");
    }
  }, [state]);

  //計時器開始 or 結束
  function timerController() {
    if (btnTitle === "開始專注") {
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
    <View style={Style.container}>
      {/* 花的動畫 */}
      <LottieView
        style={Style.flowerAnimation}
        source={require("./assets/70942-orange-plant.json")}
        ref={lottieRef}
        speed={1}
        loop={true}
        renderMode={"SOFTWARE"}
      />

      {/* 記錄到的總秒數 方便觀察所以先留著*/}
      {/* <Text>{time}</Text> */}

      {/* 轉換過格式的時間 */}
      <Text style={Style.timeText}>
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
          backgroundColor: btnTitle === "開始專注" ? "#FF9F00" : "#de7d00",
          width: 200,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Text style={Style.timerBtnTitle}>{btnTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

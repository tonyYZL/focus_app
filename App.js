import React, { useRef, useState, useEffect } from "react";
import {
  AppState,
  Alert,
} from "react-native";
import Controller from "./controllers"
import HomePage from "./home"
import firebase from "./firebase";

let alertPresent = false;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [state, setState] = useState("");
  const [time, setTime] = useState(0);
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
      Controller.timerStop();
      if (!alertPresent) {
        alertPresent = true;
        Alert.alert(
          "已自動停止計時",
          "\n你剛才好像分心了哦，再堅持久一點，你可以的！！",
          [
            { text: "沒問題！", onPress: () => alertPresent = false }
          ]
        );
      }
      setBtnTitle("開始專注");
      setState("");
      console.log("stop");
    }
  }, [state]);

  return (
    <>
      <HomePage time={time} title={btnTitle} setTime={setTime} setBtnTitle={setBtnTitle}/>
    </>
  )
};

export default App;

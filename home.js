import React, { useRef, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Button, Alert } from "react-native";
import Style from "./style";
import LottieView from "lottie-react-native";
import Controller from "./controllers";

const HomePage = (props) => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [letter, setLetter] = useState(" ");

  //將 time 轉換成畫面顯示的時、分、秒
  useEffect(() => {
    setSeconds(props.time % 60);
    setMinutes(Math.floor((props.time % 3600) / 60));
    setHours(Math.floor(props.time / 3600));
  }, [props.time]);
  //--------------------------------

  //依照不同時間顯示不同內容
  useEffect(() => {
    if (props.title === "開始專注") {
      setLetter("");
    } else if (hours == 0) {
      setLetter("快開始加油吧");
    } else if (hours == 1) {
      setLetter("努力向上！");
    } else if (hours == 2) {
      setLetter("會不會累啊，要記得休息喔");
    } else if (hours >= 2) {
      setLetter("快休息一下，連續專注太久拉");
    }
  }, [hours, props.title]);
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
      <View style={Style.header}>
        <Text style={Style.cheeringText}>{letter}</Text>
      </View>

      {/* 花的動畫 */}
      <LottieView
        style={Style.flowerAnimation}
        source={require("./assets/70942-orange-plant.json")}
        ref={lottieRef}
        speed={1}
        loop={true}
        renderMode={"SOFTWARE"}
      />

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
        onPress={() => {
          Controller.timerController(
            props.title,
            props.setTime,
            props.setBtnTitle,
            setSeconds
          );
        }}
        style={{
          backgroundColor: props.title === "開始專注" ? "#FF9F00" : "#de7d00",
          width: 200,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Text style={Style.timerBtnTitle}>{props.title}</Text>
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      <Button
        onPress={() => {
          Controller.totaltime()
            .then((res) => {
              setTotalTime(res);
            })
            .then(() => {
              Alert.alert("目前累計時間", `\n${totalTime}秒`, [
                { text: "關閉" },
              ]);
            });
        }}
        title="累計時間"
        color="#FF9F00"
      />
    </View>
  );
};

export default HomePage;

import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Style from "./style";
import LottieView from "lottie-react-native";
import Controller from "./controllers";

const HomePage = (props) => {
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //將 time 轉換成畫面顯示的時、分、秒
  useEffect(() => {
    setSeconds(props.time % 60);
    if (!(props.time % 60) && props.time != 0) {
      setMinutes((minutes) => minutes + 1);
    }
  }, [props.time]);

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
      {/* <Text>{props.time}</Text> */}

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
    </View>
  );
};

export default HomePage;

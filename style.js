import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#FF9F00",
    width: "100%",
    height: "12%",
    position: "absolute",
    top: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  cheeringText: {
    fontSize: 26,
    fontWeight: "300",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 60,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  flowerAnimation: {
    marginTop: 20,
    height: 400,
    marginBottom: 30,
    marginLeft: -6,
  },

  timeText: {
    fontSize: 60,
    fontWeight: "100",
    letterSpacing: 5,
  },

  timerBtnTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* <TouchableOpacity activeOpacity={0.5}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="red"
          activeOpacity={0.5}
          onPress={() => console.log("pressed")}
        >
          <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight> */}
        {/* <TouchableWithoutFeedback>
          <Text style={styles.btnText}>Work</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log("pressed?")}>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableWithoutFeedback> */}
        <Pressable
          hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
          onPress={() => console.log("pressed!")}
        >
          <Text style={styles.btnText}>Work</Text>
        </Pressable>
        <Pressable onPress={() => console.log("pressed!")}>
          <Text style={styles.btnText}>Travel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 38,
  },
});

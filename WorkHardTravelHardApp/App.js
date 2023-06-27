import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);

  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: { text, work: working } };
    setToDos(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.gray }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.gray : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          returnKeyType="done"
          onSubmitEditing={addToDo}
          value={text}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={working ? "Add a To Do" : "Where do you wanna go?"}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) => {
          return (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          );
        })}
      </ScrollView>
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
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 16,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
});

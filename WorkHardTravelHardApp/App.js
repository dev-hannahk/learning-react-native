import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    try {
      const toDos = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY, toDos);
    } catch (error) {
      alert("Error on Saving To Dos or Travel List.");
    }
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setTimeout(() => setText(""), 50);
  };

  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "cancel" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos }; // new Object
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.grey : "white" }}
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
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text>
                  <Fontisto name="trash" size={24} color="grey" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
});

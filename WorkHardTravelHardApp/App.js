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
import { Fontisto, Entypo } from "@expo/vector-icons";
import { theme } from "./colors";

const STORAGE_KEY = "@toDos";
const TAB = "@tab";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
    loadTab();
  }, []);

  const travel = () => {
    setWorking(false);
    saveTab(false);
  };

  const work = () => {
    setWorking(true);
    saveTab(true);
  };

  const onChangeText = (payload) => {
    setText(payload);
  };

  const saveTab = async (item) => {
    try {
      const tab = JSON.stringify(item);
      await AsyncStorage.setItem(TAB, tab);
    } catch (error) {
      alert("Error on Saving Tab");
    }
  };

  const loadTab = async (tab) => {
    const s = await AsyncStorage.getItem(TAB);
    setWorking(JSON.parse(s));
  };

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

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, done: false, edit: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setTimeout(() => setText(""), 50);
  };

  const doneToDo = async (key) => {
    if (toDos[key].edit === true) toDos[key].edit = false;
    toDos[key].done = !toDos[key].done;
    updateToDo();
  };

  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
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

  const editToDo = async (key) => {
    toDos[key].edit = !toDos[key].edit;
    updateToDo();
  };

  const editing = (payload, key) => {
    toDos[key].text = payload;
    updateToDo();
  };

  const updateToDo = async () => {
    const newToDos = { ...toDos };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.grey : "white",
            }}
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
              <View style={styles.toDoItem}>
                <TouchableOpacity onPress={() => doneToDo(key)}>
                  <Text style={styles.toDoCheck}>
                    {toDos[key].done ? (
                      <Fontisto
                        name="checkbox-active"
                        size={24}
                        color="beige"
                      />
                    ) : (
                      <Fontisto
                        name="checkbox-passive"
                        size={24}
                        color="beige"
                      />
                    )}
                  </Text>
                </TouchableOpacity>
                <View>
                  {toDos[key].edit ? (
                    <TextInput
                      autoFocus={true}
                      style={styles.editInput}
                      value={toDos[key].text}
                      onChangeText={(payload) => editing(payload, key)}
                    />
                  ) : (
                    <Text
                      style={{
                        ...styles.toDoText,
                        textDecorationLine: toDos[key].done
                          ? "line-through"
                          : null,
                      }}
                    >
                      {toDos[key].text}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.buttons}>
                {toDos[key].done ? null : toDos[key].edit ? (
                  <TouchableOpacity onPress={() => editToDo(key)}>
                    <Text style={{ marginRight: 10 }}>
                      <Fontisto name="save" size={24} color="darksalmon" />
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => editToDo(key)}>
                    <Text style={{ marginRight: 10 }}>
                      <Entypo name="edit" size={24} color="darksalmon" />
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Text>
                    <Fontisto name="trash" size={24} color="grey" />
                  </Text>
                </TouchableOpacity>
              </View>
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
  toDoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  toDoCheck: {
    marginRight: 10,
  },
  editInput: {
    color: "black",
    fontSize: 16,
    opacity: 0.5,
    backgroundColor: "white",
    width: 200,
    height: 24,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

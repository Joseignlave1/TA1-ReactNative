import React, { useState } from "react";
import { StyleSheet, Text, FlatList, StatusBar, View, Button, TouchableOpacity} from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
export default function HomeScreen() {
  const tareasIniciales = ["Comer", "Beber", "Dormir"];

  const[nuevaTarea, setNuevaTarea] = useState<string>("");
  const [tareas, setTareas] = useState(tareasIniciales);
  const [counter, setCounter] = useState(0);
  const handleDelete = (elem : string) => {
    setTareas((prevState) => prevState.filter(actualElem => actualElem !== elem));
  }
  const handleAddItem = (elem : string) => {
    if(elem.trim()) { //Tarea no vacia
      setTareas((prevState) => [...prevState, elem])
      setNuevaTarea("");
    }
  }

  const handleSumCounter = () => {
    setCounter(counter + 1);
  }

  const handleSubstractCounter = () => {
    counter > 0 ? setCounter(counter - 1) : setCounter(0);
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]}>
          <View>
            <TextInput
              value={nuevaTarea}
              onChangeText={setNuevaTarea}
              placeholder="Ingrese nueva tarea"
            />
            <Button
              onPress={() => handleAddItem(nuevaTarea)}
              title="Añadir nueva Tarea"
            />
          </View>
          <FlatList
            data={tareas}
            renderItem={({ item }) => (
              <View>
                <Text>{item}</Text>
                <Button
                  onPress={() => handleDelete(item)}
                  title="Borrar Tarea"
                />
              </View>
            )}
            keyExtractor={(item) => item}
          />
          <View style={styles.container}>
            <Text>Cuenta la cantidad de tareas que realizaste!</Text>
            <Text>{counter}</Text>
            <TouchableOpacity style={styles.button} onPress={handleSumCounter}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubstractCounter}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

 const styles = StyleSheet.create({
   container: {
     marginTop: 50,
     alignItems: 'center'
   },
   button: {
     width: 50,
     height: 20,
     backgroundColor: "skyblue",
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 5,
     margin: 10, //Margin entre los botones
   },
   buttonText: {
     color: "#fff",
     fontSize: 16,
     fontWeight: "bold",
   },
 });

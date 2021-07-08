import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { CustomButton, IconifyButton, RemovableListItem } from "../components";

const IngredientsScreen = () => {
  const [count, setCount] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const handleText = (text) => {
    setIngredient(text);
  };

  const addIngredient = () => {
    Keyboard.dismiss();
    const text = ingredient.trim();
    handleText("");

    if (/\S/.test(text) && !ingredientList.includes(text)) {
      setCount(count + 1);
      setIngredientList([...ingredientList, text]);
    }
  };

  const removeIngredient = (idx) => {
    Keyboard.dismiss();
    const newIngredients = [...ingredientList];
    newIngredients.splice(idx, 1);
    setIngredientList(newIngredients);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={styles.itemWrapper}>
            {ingredientList.map((item, idx) => (
              <RemovableListItem
                key={idx}
                color={"#000102"}
                backgroundColor={"#FEFEFE"}
                text={item}
                onRemove={() => removeIngredient(idx)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomButtons}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeIngredientWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write an ingredient"}
            value={ingredient}
            onChangeText={handleText}
            onSubmitEditing={addIngredient}
          />
          <IconifyButton
            style={styles.addButton}
            icon={"gamepad-round"}
            iconSize={34}
            color={"#000102"}
            onPress={addIngredient}
          />
        </KeyboardAvoidingView>
        <CustomButton
          onPress={() => {}}
          size="big"
          backgroundColor={"#F7F401"}
          color={"#000102"}
          tittle={"Find Recepie"}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },

  itemWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  bottomButtons: {
    position: "absolute",
    bottom: 25,
    marginHorizontal: 5,
  },

  writeIngredientWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 10,
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "80%",
    backgroundColor: "#FEFEFE",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },

  addButton: {
    backgroundColor: "#F7F401",
    borderRadius: 60,
    borderColor: "#E3DF05",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },

  scrollContainer: {
    height: 450,
  },

  scroll: {
    flexGrow: 1,
  },
});

export default IngredientsScreen;

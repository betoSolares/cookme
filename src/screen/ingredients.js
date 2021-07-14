import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomButton, IconifyButton, RemovableListItem } from "../components";
import { checkContract } from "../utils";

const IngredientsScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { recipeSearch } = route.params;
  const validRecipeSearch = checkContract(recipeSearch, ["getRecipe"]);

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

  const searchRecipe = async () => {
    const alertButtons = [{ text: "Ok" }];
    const alertOptions = { cancelable: true };

    if (validRecipeSearch) {
      setSpinner(true);
      if (ingredientList.length > 0) {
        const recepies = await recipeSearch.getRecipe(ingredientList);
        if (recepies.recepies.length > 0) {
          setSpinner(false);
          navigation.navigate("Recepies", { recepies: recepies.recepies });
        } else {
          setSpinner(false);
          Alert.alert(
            recepies.error,
            recepies.message,
            alertButtons,
            alertOptions
          );
        }
      } else {
        setSpinner(false);
        Alert.alert(
          "Error",
          "Insert at least one ingredient",
          alertButtons,
          alertOptions
        );
      }
    } else {
      Alert.alert(
        "Error",
        "Ingredients detector is invalid.",
        alertButtons,
        alertOptions
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={"Processing image"}
        color={"#F7F401"}
        textStyle={styles.spinnerText}
      />
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
          onPress={searchRecipe}
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

IngredientsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default IngredientsScreen;

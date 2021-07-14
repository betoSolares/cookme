import PropTypes from "prop-types";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { NormalListItem } from "../components";

const RecepiesScreen = ({ navigation, route }) => {
  const { recepies } = route.params;

  const changeToSpecific = (idx) => {
    const title = recepies[idx].recipe.label;
    const reference = recepies[idx].recipe.uri;
    const { image } = recepies[idx].recipe;
    const source = recepies[idx].recipe.url;
    const { ingredients } = recepies[idx].recipe;
    navigation.navigate("Specific", {
      title,
      reference,
      image,
      source,
      ingredients,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.itemWrapper}>
          {recepies.map((item, idx) => (
            <NormalListItem
              key={idx}
              color={"#000102"}
              backgroundColor={"#FEFEFE"}
              text={item.recipe.label}
              onPress={() => changeToSpecific(idx)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },

  scroll: {
    flexGrow: 1,
  },

  itemWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

RecepiesScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default RecepiesScreen;

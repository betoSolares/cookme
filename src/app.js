import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from "expo";
import React from "react";

import {
  AccountScreen,
  CameraScreen,
  IngredientsScreen,
  RecepiesScreen,
  SettingsScreen,
} from "./screen";
import { EdamamAPI, LogMealAPI } from "./services";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen
        name={"Camera"}
        component={CameraScreen}
        initialParams={{
          ingredientDetector: LogMealAPI,
          recipeSearch: EdamamAPI,
        }}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"Account"} component={AccountScreen} />
      <Stack.Screen name={"Settings"} component={SettingsScreen} />
      <Stack.Screen name={"Ingredients"} component={IngredientsScreen} />
      <Stack.Screen
        name={"Recepies"}
        component={RecepiesScreen}
        initialParams={{ recepies: [] }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default registerRootComponent(App);

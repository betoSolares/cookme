import { LOGMEALKEY } from "@env";
import * as FileSystem from "expo-file-system";

const fileExists = async (file) => {
  const fileInfo = await FileSystem.getInfoAsync(file);
  return fileInfo.exists;
};

const makeRequest = async (file) => {
  const localUri = file;
  const filename = localUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const form = new FormData();
  form.append("image", { uri: localUri, name: filename, type });

  const response = await fetch(
    "https://api.logmeal.es/v2/recognition/complete",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${LOGMEALKEY}`,
        "Content-Type": "multipart/form-data",
      },
      body: form,
    }
  );

  return { status: response.status, data: await response.json() };
};

const parseResponse = (response) => {
  const results = response.recognition_results;
  const ingredients = [];

  for (const ingredient of results) {
    if (ingredient.prob >= 0.1) {
      ingredients.push(ingredient.name);
    }
  }

  return ingredients;
};

const detectIngredients = async (file) => {
  if (await fileExists(file)) {
    const { status, data } = await makeRequest(file);

    if (status === 400) {
      return { error: "Error", message: data.message, ingredients: [] };
    }

    const results = parseResponse(data);
    if (results.length >= 0) {
      return { error: "", message: "", ingredients: results };
    }
    return { error: "Error", message: "No ingredients found", ingredients: [] };
  }
};

export default {
  detectIngredients,
};

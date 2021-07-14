import { EDEMAMID, EDEMAMKEY } from "@env";

const parseIngredients = (ingredients) => {
  const newIngredients = ingredients.join(" and ");
  const clean = newIngredients.replace(/\s/g, "%20");
  return clean;
};

const makeRequest = async (ingredients) => {
  const query = parseIngredients(ingredients);
  const url = `https://api.edamam.com/search?app_id=${EDEMAMID}&app_key=${EDEMAMKEY}&q=${query}`;
  const response = await fetch(url);
  return { status: response.status, data: await response.json() };
};

const getRecipe = async (ingredients) => {
  const { status, data } = await makeRequest(ingredients);

  if (status !== 200) {
    return { error: "Error", message: "Something occurred searching the recepie", recepies: [] };
  }

  if (data.hits >= 1) {
    return { error: "", message: "", recepies: data };
  }

  return { error: "Error", message: "No recepie found", recepies: [] };
};

export default {
  getRecipe
};

const axios = require('axios');
const { Recipe, Diet } = require('../db');


const getApiRecipes = async () => {
    try {
      const { API_URL, API_KEY } = process.env;

     /* const recipesUrl = axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`).data */
   
      const recipesUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&offset=100`, { headers: { 'Accept-Encoding': 'identity' } });
  
      if (!recipesUrl.data || !recipesUrl.data.results || !Array.isArray(recipesUrl.data.results)) {
        throw new Error('Invalid API response');
      }
  
      const recipesApi = recipesUrl.data.results.map(e => {
        return {
          id: e.id,
          name: e.title,
          summary: e.summary,
          healthScore: e.healthScore,
          image: e.image,
          diets: e.diets,
          steps: e.analyzedInstructions.map(e => e.steps.map(e => {
            return {
              number: e.number,
              step: e.step
            };
          }))
        };
      });
  
      return recipesApi;
    } catch (error) {
      console.error('Error fetching API recipes:', error);
      throw error;
    }
  };

/* const getApiRecipes = async () => {
  const { API_URL, API_KEY } = process.env;
  const recipesUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&offset=100`, { headers: { 'Accept-Encoding': 'identity' } });
  const recipesApi = await recipesUrl.data.results.map(e => {
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets,
      steps: e.analyzedInstructions.map(e => e.steps.map(e => {
        return {
          number: e.number,
          step: e.step
        };
      }))
    };
  });
  return recipesApi;
}; */

const getDbRecipes = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
};

const getTotalRecipes = async () => {
  const totalApi = await getApiRecipes();
  const totalDb = await getDbRecipes();
  const totalApiDb = totalApi.concat(totalDb);
  return totalApiDb;
};

module.exports = getTotalRecipes;
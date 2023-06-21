const axios = require ('axios')
const { Recipe, Diet } = require('../db')
const { API_URL, API_KEY } = process.env;
//Los controllers sí tienen habilitado interactuar con los models.

const getTotalDiets = async (req, res, next) =>{
    try {
        let dietUrl = await axios.get(`${API_URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&offset=100`, {headers:{'Accept-Encoding': 'identity'}})
        let dietApi = await dietUrl.data.results.map(e => e.diets)
        let finalDiets = []
        let totalDietApi = dietApi.flat();
                totalDietApi.forEach(diet => {
                    if (!finalDiets.includes(diet)) {
                        finalDiets.push(diet);
                        Diet.findOrCreate({
                    where: {
                name: diet
            }
        });
    }
});
        // comento y corrijo código ya que tenía un loop, dejo el código comentado que había hecho antes para revisarlo.
       /*  let totalDietApi = dietApi.flat().forEach(diet => {
            let totalDietApi = dietApi.flat().forEach((diet) => {
                if (!finalDiets.includes(diet)) {
                    finalDiets.push(diet);
                }
            })
            finalDiets.forEach(diet=> { // cambié diets por diet, revisar
            Diet.findOrCreate({
                where:{
                    name: diet}
                }) 
        });
    }) */
        console.log('diets cargadas en db')
    } catch (error) {
        next(error)
    }
};

const getDbDiets = async (req, res, next) => {
    try {
        const dietsDb = await Diet.findAll()
        res.send(dietsDb)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getTotalDiets,
    getDbDiets
}   
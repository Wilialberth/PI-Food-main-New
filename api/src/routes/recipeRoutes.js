const express = require('express');
const { Router } = require('express');
const getTotalRecipes = require('../controllers/recipeControllers')();
//const getTotalRecipes = require('../controllers/recipeControllers');
const { Recipe, Diet } = require('../db');


const router = Router();


router.get('/', async (req, res, next) =>{ // Revisar '/recipes/name'
    const { name } = req.query
    const recipesTotal = await (getTotalRecipes());
    try{
        if(!name){
            res.status(200).send(recipesTotal)
        }
        else{
            let recipeName = recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length?
            res.status(200).send(recipeName):
            res.status(404).send('The name of the recipe is not found')
        }
    }
    catch(error){
            next(error)
    }
})   


router.get('/:idReceta', async (req,res,next) =>{ // /recipes/:idRecipe
    const { idReceta }  = req.params
    const recipesTotal = await getTotalRecipes();
    const recipeId = recipesTotal.filter(e => e.id.toString() === idReceta.toString())
    try{
        if(recipeId.length){
            res.status(200).send(recipeId)
        }
        else{
            res.status(404).send('Recipe id not found')
        }
    }
    catch(error){
        next(error)
    }
})

//// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post('/', async (req, res, next) => {
    const {name, summary, healthScore, image, step, createdInDb, diet} = req.body
    try {
        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            step,
            createdInDb,
        })
        const dietCreated = await Diet.findAll({ // hago await ya que me devuelve una promesa y espero a que esa promesa se resuelva y ese valor lo voy a guardar en await
            where:{
                name : diet
            }
        })
        recipeCreated.addDiet(dietCreated)
        res.status(201).send('Recipe created succesfully')  
    } catch (error) {
        next(error) // agrego next(error)
        //console.log(error)
        res.send(error) // agrego res.send
    }
})

router.delete('/:id/delete', async (req, res, next) =>{
    const { id } = req.params;
    try {
        let recipeDelete = await Recipe.findByPk(id)
        recipeDelete.destroy();
        res.status(201).send("Recipe deleted correctly");
    } catch (err) {
        next(err)
       
    }
})

module.exports = router;
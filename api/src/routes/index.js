const { Router } = require('express');
const recipeRoutes = require('./recipeRoutes');
const dietRoutes = require ('./dietRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/recipes", recipeRoutes)
router.use("/diets", dietRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

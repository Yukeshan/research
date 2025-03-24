

const express = require('express');
const router  = express.Router();

const itemController = require('../controllers/itemController');
const recipeRecomFunc = require('../controllers/recipeRecommandationController');


router.get('/all-items', itemController.getAllItems)
router.get('/items', itemController.getSeachedItems);
router.get('/items/:id', itemController.getSingleItem);
router.post("/recommend",recipeRecomFunc.reverseRecipeSearch);

module.exports = router;
const express = require('express'); 
const router = express.Router(); 
const { 
getAllArticles, 
searchArticles, 
getArticleById, 
createArticle, 
updateArticle, 
deleteArticle 
} = require('../controllers/articleController'); 
// IMPORTANT : /search doit être AVANT /:id pour éviter les conflits 
router.get('/search', searchArticles); 
router.get('/',  getAllArticles);      
router.get('/:id',     getArticleById);
router.post('/',     createArticle);  
router.put('/:id', updateArticle );
router.delete('/:id',  deleteArticle); 
module.exports = router;
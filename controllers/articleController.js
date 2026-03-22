const ArticleModel = require('../models/articleModel'); 
 
// GET /api/articles 
const getAllArticles = (req, res) => { 
  try { 
    const { categorie, auteur, date } = req.query; 
    const articles = ArticleModel.findAll({ categorie, auteur, date }); 
    res.status(200).json({ articles }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
}; 
 
// GET /api/articles/search?query=texte 
const searchArticles = (req, res) => { 
  try { 
    const { query } = req.query; 
    if (!query) { 
      return res.status(400).json({ message: 'Le paramètre "query" est requis.' }); 
    } 
    const articles = ArticleModel.search(query); 
    res.status(200).json({ articles }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
}; 
 
// GET /api/articles/:id 
const getArticleById = (req, res) => { 
  try { 
    const article = ArticleModel.findById(req.params.id); 
    if (!article) { 
      return res.status(404).json({ message: 'Article non trouvé.' }); 
    } 
    res.status(200).json({ article }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
}; 
 
// POST /api/articles 
const createArticle = (req, res) => { 
  try { 
    const { titre, contenu, auteur, date, categorie, tags } = req.body; 
 
 
 
    if (!titre || titre.trim() === '') { 
      return res.status(400).json({ message: 'Le titre est obligatoire.' }); 
    } 
    if (!auteur || auteur.trim() === '') { 
      return res.status(400).json({ message: "L'auteur est obligatoire." }); 
    } 
    if (!contenu || contenu.trim() === '') { 
      return res.status(400).json({ message: 'Le contenu est obligatoire.' }); 
    } 
    if (!categorie || categorie.trim() === '') { 
      return res.status(400).json({ message: 'La catégorie est obligatoire.' }); 
    } 
 
    const article = ArticleModel.create({ titre, contenu, auteur, date, categorie, tags: tags || [] 
}); 
    res.status(201).json({ message: 'Article créé avec succès.', article }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
}; 
 
// PUT /api/articles/:id 
const updateArticle = (req, res) => { 
  try { 
    const article = ArticleModel.findById(req.params.id); 
    if (!article) { 
      return res.status(404).json({ message: 'Article non trouvé.' }); 
    } 
 
    const updated = ArticleModel.update(req.params.id, req.body); 
    res.status(200).json({ message: 'Article mis à jour avec succès.', article: updated }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
}; 
 
// DELETE /api/articles/:id 
const deleteArticle = (req, res) => { 
  try { 
    const deleted = ArticleModel.delete(req.params.id); 
    if (!deleted) { 
      return res.status(404).json({ message: 'Article non trouvé.' }); 
    } 
    res.status(200).json({ message: 'Article supprimé avec succès.' }); 
  } catch (err) { 
    res.status(500).json({ message: 'Erreur serveur', error: err.message }); 
  } 
 
}; 
module.exports = { 
getAllArticles, 
searchArticles, 
getArticleById, 
createArticle, 
updateArticle, 
deleteArticle 
};
const db = require('../database'); 
 
const ArticleModel = { 
 
  // Récupérer tous les articles (avec filtres optionnels) 
  findAll({ categorie, auteur, date } = {}) { 
    let query = 'SELECT * FROM articles WHERE 1=1'; 
    const params = []; 
 
    if (categorie) { query += ' AND categorie = ?'; params.push(categorie); } 
    if (auteur)    { query += ' AND auteur = ?';    params.push(auteur); } 
    if (date)      { query += ' AND date = ?';      params.push(date); } 
 
    query += ' ORDER BY id DESC'; 
    return db.prepare(query).all(...params); 
  }, 
 
  // Récupérer un article par ID 
  findById(id) { 
    return db.prepare('SELECT * FROM articles WHERE id = ?').get(id); 
  }, 
 
  // Rechercher dans titre ou contenu 
  search(query) { 
    const like = `%${query}%`; 
    return db.prepare( 
      'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY id DESC' 
    ).all(like, like); 
  }, 
 
  // Créer un article 
  create({ titre, contenu, auteur, date, categorie, tags }) { 
    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : [tags]); 
    const stmt = db.prepare( 
      'INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?,?)' 
    ); 
    const result = stmt.run(titre, contenu, auteur, date || new Date().toISOString().split('T')[0], 
categorie, tagsJson); 
    return this.findById(result.lastInsertRowid); 
  }, 
 
  // Mettre à jour un article 
  update(id, { titre, contenu, categorie, tags }) { 
    const article = this.findById(id); 
    if (!article) return null; 
 
 
 
    const newTitre    = titre     ?? article.titre; 
    const newContenu  = contenu   ?? article.contenu; 
    const newCategorie= categorie ?? article.categorie; 
    const newTags     = tags      ? JSON.stringify(Array.isArray(tags) ? tags : [tags]) : 
article.tags; 
 
    db.prepare( 
      'UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?' 
    ).run(newTitre, newContenu, newCategorie, newTags, id); 
 
    return this.findById(id); 
  }, 
 
  // Supprimer un article 
  delete(id) { 
    const result = db.prepare('DELETE FROM articles WHERE id = ?').run(id); 
    return result.changes > 0; 
  } 
}; 
 
module.exports = ArticleModel;
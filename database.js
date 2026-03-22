const Database = require('better-sqlite3'); 
const path = require('path'); 
const DB_PATH = path.join(__dirname, '../database.sqlite'); 
const db = new Database(DB_PATH); 
// Activer les clés étrangères 
db.pragma('journal_mode = WAL'); 
db.pragma('foreign_keys = ON'); 
// Création de la table articles 
db.exec(` 
CREATE TABLE IF NOT EXISTS articles ( 
id        
INTEGER PRIMARY KEY AUTOINCREMENT, 
titre     
TEXT    NOT NULL, 
contenu   TEXT    NOT NULL, 
auteur    TEXT    NOT NULL, 
date      
TEXT    NOT NULL DEFAULT (date('now')), 
categorie TEXT    NOT NULL, 
tags      
TEXT    NOT NULL DEFAULT '[]' 
) 
`); 
module.exports = db;
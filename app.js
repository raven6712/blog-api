const express = require('express'); 
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express'); 
const YAML = require('yamljs'); 
const path = require('path'); 
 
const articleRoutes = require('./routes/articleRoutes'); 
 
const app = express(); 
const PORT = process.env.PORT || 3000; 
 
// Middlewares 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
 
// Documentation Swagger 
const swaggerDocument = YAML.load(path.join(__dirname,'swagger.yaml')); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
 
// Routes 
app.use('/api/articles', articleRoutes); 
// Route racine 
app.get('/', (req, res) => { 
  res.json({ 
    message: '🚀Blog API - INF222 TAF1', 
    documentation: `http://localhost:${PORT}/api-docs`, 
    endpoints: { 
      articles: `http://localhost:${PORT}/api/articles` 
    } 
  }); 
}); 
 
// Gestion des routes inexistantes 
app.use((req, res) => { 
  res.status(404).json({ message: 'Route non trouvée.' }); 
}); 
 
// Lancement du serveur 
app.listen(PORT, () => { 
  console.log(`✅Serveur démarré sur http://localhost:${PORT}`); 
  console.log(`📄 Documentation Swagger : http://localhost:${PORT}/api-docs`); 
}); 
 
module.exports = app; 
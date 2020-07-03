const { Router } = require('express');

const routes = new Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const CategoriesController = require('./app/controllers/CategoriesController');
const SubCategoriesController = require('./app/controllers/SubCategoriesController');
const InsumosController = require('./app/controllers/IsumosController');
const ComprasController = require('./app/controllers/ComprasController');
const SaidasController = require('./app/controllers/SaidasController');

const auth = require('./app/middlewares/auth');

const Categories = require('./app/models/Categories');

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/', (req, res)=>{
    return res.send('OK');
});

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.get('/categories', CategoriesController.index);
routes.post('/categories', CategoriesController.store);
routes.put('/categories', CategoriesController.update);
routes.get('/subcategories', SubCategoriesController.index);
routes.post('/subcategories', SubCategoriesController.store);
routes.put('/subcategories', SubCategoriesController.update);
routes.get('/insumos', InsumosController.index);
routes.post('/insumos', InsumosController.store);
routes.put('/insumos', InsumosController.update);
routes.get('/compras', ComprasController.index);
routes.post('/compras', ComprasController.store);
routes.get('/saidas', SaidasController.index);
routes.post('/saidas', SaidasController.store);


module.exports = routes;
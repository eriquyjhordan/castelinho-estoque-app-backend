const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');
const Categories = require('../app/models/Categories');
const SubCategories = require('../app/models/SubCategories');
const Insumos = require('../app/models/Insumos');
const Compras = require('../app/models/Compras');
const Saidas = require('../app/models/Saidas');

const models = [User, Categories, SubCategories, Insumos, Compras, Saidas];

class Database {
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map(model => {
            model.init(this.connection);
            model.associate && model.associate(this.connection.models);
        });
    }
}

module.exports = new Database();
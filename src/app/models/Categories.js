const { Model, Sequelize } = require('sequelize');

class Categories extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
        },
        {
            sequelize,
        }
        );
    }
}

module.exports = Categories;
const { Model, Sequelize } = require('sequelize');

class SubCategories extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
        },
        {
            sequelize,
        }
        );
    }
    static associate(models){
        this.belongsTo(models.Categories, { foreignKey: 'category'});
    }
}

module.exports = SubCategories;
const { Model, Sequelize } = require('sequelize');

class Insumos extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            quantidade: Sequelize.FLOAT,
            minimo: Sequelize.FLOAT,
        },
        {
            sequelize,
        }
        );
    }
    static associate(models){
        this.belongsTo(models.Categories, { foreignKey: 'category'});
        this.belongsTo(models.SubCategories, { foreignKey: 'sub_category'});
        this.belongsTo(models.User, { foreignKey: 'by_user'});
    }
}

module.exports = Insumos;
const { Model, Sequelize } = require('sequelize');

class Saidas extends Model{
    static init(sequelize){
        super.init({
            quantidade: Sequelize.FLOAT,
        },
        {
            sequelize,
        }
        );
    }
    static associate(models){
        this.belongsTo(models.Insumos, { foreignKey: 'insumo'});
        this.belongsTo(models.User, { foreignKey: 'by_user'});
    }
}

module.exports = Saidas;
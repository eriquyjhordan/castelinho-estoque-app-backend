const { Model, Sequelize } = require('sequelize');

class Compras extends Model{
    static init(sequelize){
        super.init({
            quantidade: Sequelize.FLOAT,
            custo: Sequelize.FLOAT,
        },
        {
            sequelize,
        }
        );
    }
    static associate(models){
        this.belongsTo(models.Insumos, { foreignKey: 'insumo'});
    }
}

module.exports = Compras;
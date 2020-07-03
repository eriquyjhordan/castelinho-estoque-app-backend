const Yup = require('yup');
const Saidas = require('../models/Saidas');
const Insumos = require('../models/Insumos');
const User = require('../models/User');

class SaidasController{
    async store(req, res){

        const schema = Yup.object().shape({
            quantidade: Yup.string().required(),
            insumo: Yup.string().required(),
            by_user: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const insumo = await Insumos.findByPk(req.body.insumo);

        if (!insumo){
            return res.status(400).json({ error: 'Insumo not found' });
        }

        const user = await User.findByPk(req.body.by_user);
        
        if (!user){
            return res.status(400).json({ error: 'User not found' });
        }

        const qtd_saida = parseFloat(req.body.quantidade);
        let quantidade = parseFloat(insumo.quantidade);
        quantidade -= qtd_saida;
        const { newquantidade } = await insumo.update({quantidade});

        const saida = await Saidas.create(req.body);
        return res.json({
            saida,
        });
    }
    async index(req, res){
        const saidas = await Saidas.findAll({
            attributes: ['id', 'quantidade', 'created_at'],
            include: [
                {
                    model: Insumos,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(saidas);
    }
}

module.exports = new SaidasController();
const Yup = require('yup');
const Compras = require('../models/Compras');
const Insumos = require('../models/Insumos');

class ComprasController{
    async store(req, res){

        const schema = Yup.object().shape({
            quantidade: Yup.string().required(),
            custo: Yup.string().required(),
            insumo: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const insumo = await Insumos.findByPk(req.body.insumo);

        if (!insumo){
            return res.status(400).json({ error: 'Insumo not found' });
        }
        const qtd_compra = parseFloat(req.body.quantidade);
        let quantidade = parseFloat(insumo.quantidade);
        quantidade+= qtd_compra;
        const { newquantidade } = await insumo.update({quantidade});

        const compra = await Compras.create(req.body);
        return res.json({
            compra,
            nova_quantidade: newquantidade,
        });
    }

    async index(req, res){
        const compras = await Compras.findAll({
            attributes: ['id', 'quantidade', 'created_at'],
            include: [
                {
                    model: Insumos,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(compras);
    }
}

module.exports = new ComprasController();
const Yup = require('yup');
const Insumos = require('../models/Insumos');
const Categories = require('../models/Categories');
const SubCategories = require('../models/SubCategories');

class InsumosController{
    async store(req, res){
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            quantidade: Yup.string().required(),
            minimo: Yup.string().required(),
            by_user: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const InsumoExits = await Insumos.findOne({ where: {name: req.body.name }});
        if (InsumoExits){
            return res.status(400).json({ error: 'Insumo already exists '});
        }
        const insumo = await Insumos.create(req.body);
        return res.json(insumo);
    }

    async update(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            newname: Yup.string(),
            quatidade: Yup.string(),
            minimo: Yup.string(),
            by_user: Yup.string(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { name, newname } = req.body;
        
        const insumo = await Insumos.findOne({where: { name }});
        if (!insumo){
            return res.status(400).json({ error: 'Insumo not found '});
        }
        if(newname){
            const InsumoExits = await Insumos.findOne({ where: { name: newname }});
            if (InsumoExits){
                return res.status(400).json({ error: 'Insumo already exists '});
            }
            req.body.name = newname;
        }
        const newinsumo = await insumo.update(req.body);
        return res.json(newinsumo);
    }

    async index(req, res){
        const insumos = await Insumos.findAll({
            attributes: ['id', 'name', 'quantidade'],
            order: [
                'name'
            ],
            include: [
                {
                    model: Categories,
                    attributes: ['id', 'name']
                },
                {
                    model: SubCategories,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(insumos);
    }
    
}

module.exports = new InsumosController();
const Yup = require('yup');
const Categories = require('../models/Categories');

class CategoriesController{
    async store(req, res){
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const CategoryExits = await Categories.findOne({ where: {name: req.body.name }});
        if (CategoryExits){
            return res.status(400).json({ error: 'Category already exists '});
        }
        const category = await Categories.create(req.body);
        return res.json(category);
    }

    async update(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            oldname: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { name, oldname } = req.body;
        
        const category = await Categories.findOne({where: { name: oldname }});
        if (!category){
            return res.status(400).json({ error: 'Category not found '});
        }
        const CategoryExits = await Categories.findOne({ where: { name }});
        if (CategoryExits){
            return res.status(400).json({ error: 'Category already exists '});
        }
        
        const newcategory = await category.update({name});
        return res.json(newcategory);
    }
    
    async index(req, res){
        const categories = await Categories.findAll({
            attributes: ['id', 'name']
        });
        return res.json(categories);
    }
}

module.exports = new CategoriesController();
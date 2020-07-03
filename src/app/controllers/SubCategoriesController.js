const Yup = require('yup');
const SubCategories = require('../models/SubCategories');
const Categories = require('../models/Categories');

class SubCategoriesController{
    async store(req, res){
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        // const SubCategoryExits = await SubCategories.findOne({ where: {name: req.body.name }});
        // if (SubCategoryExits){
        //     return res.status(400).json({ error: 'Category already exists '});
        // }
        const subcategory = await SubCategories.create(req.body);
        return res.json(subcategory);
    }

    async update(req, res){

        const schema = Yup.object().shape({
            name: Yup.string(),
            oldname: Yup.string().required(),
            category: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { name, oldname } = req.body;
        
        const subcategory = await SubCategories.findOne({where: { name: oldname }});
        if (!subcategory){
            return res.status(400).json({ error: 'Category not found '});
        }

        if(name){
            const SubCategoryExits = await SubCategories.findOne({ where: { name }});
            if (SubCategoryExits){
                return res.status(400).json({ error: 'Category already exists '});
            }
        }
        
        const newsubcategory = await subcategory.update(req.body);
        return res.json(newsubcategory);
    }

    async index(req, res){
        const subcategories = await SubCategories.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: Categories,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(subcategories);
    }
}

module.exports = new SubCategoriesController();
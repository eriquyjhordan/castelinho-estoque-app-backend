const Yup = require('yup');
const User = require('../models/User');

class UserController {
    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            useracess: Yup.string().required(),
            setor: Yup.string().required(),
            password: Yup.string().required().min(4),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }
        const userExists = await User.findOne({ where: {useracess: req.body.useracess }});
        
        if (userExists){
            return res.status(400).json({ error: 'User already exists '});
        }

        const {id, name, useracess, setor} = await User.create(req.body);
        return res.json({
            id,
            name,
            useracess,
            setor,
        });
    }
    async update(req, res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            useracess: Yup.string(),
            setor: Yup.string(),
            oldpassword: Yup.string().min(4),
            password: Yup.string().min(4)
                .when('oldpassword', (oldpassword, field) => {
                    oldpassword ? field.required() : field
            }),
            confirmPassword: Yup.string()
                .when('password', (password, field) => {
                    password ? field.required().oneOf([Yup.ref('password')]) : field
            }),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }

        const { useracess, oldpassword, password } = req.body;

        const user = await User.findByPk(req.userId);

        if(useracess && useracess != user.useracess){
            const userExists = await User.findOne({ where: { useracess }});
        
            if (userExists){
                return res.status(400).json({ error: 'User already exists '});
            }
        }

        if(oldpassword && !(await user.checkpassword(oldpassword))){
            return res.status(400).json({ error: 'Password does not match'});
        }

        if(!(password && oldpassword)){
            return res.status(400).json({ error: 'You need send your old password for update the password.'});
        }

        const { id, name, setor } = await user.update(req.body);
        return res.json({
            id,
            name,
            useracess,
            setor,
        })
    }

    async index(req, res){
        const users = await User.findAll({
            attributes: ['id', 'name', 'setor', 'useracess']
        });
        return res.json(users);
    }
}

module.exports = new UserController();
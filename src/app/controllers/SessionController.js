const jwt = require('jsonwebtoken'); 
const Yup = require('yup');
const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController{
    async store(req, res){
        const schema = Yup.object().shape({
            useracess: Yup.string().required(),
            password: Yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails.' });
        }
        const { useracess, password } = req.body;
        const user = await User.findOne({ where: { useracess } });
        if(!user){
            return res.status(401).json({error: 'User not found.'});
        }
        if(!(await user.checkpassword(password))){
            return res.status(401).json({error: 'Password does not match'})
        }
        const {id, name} = user;
        return res.json({
            user: {
                id,
                name,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

module.exports = new SessionController();
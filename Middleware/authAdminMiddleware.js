const User = require('../Model/User');

const verifyAdmin = async(req, res, next) => {
    const username =  req.body.username;

    try{
        const findUser = await User.findOne({ username: username })
        if(!findUser) res.json('Username not found')
        else{
            if(findUser.userType == 'admin') next()
            else res.json('Access denied')
        }
    }
    catch(err){
        res.json(err)
    }
}

module.exports = verifyAdmin;
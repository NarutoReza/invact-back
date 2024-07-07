const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//add user
exports.addUser = async(req, res) => {
    const username =  req.body.username;
    const movies = req.body.movies;
    const password = req.body.password;
    const userType = req.body.userType

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const findUser = await User.findOne({ username: username })

        if(findUser) res.json('Username already exists')
            
        else{
            const data = new User({
                username: username,
                password: hashedPassword,
                movies: movies,
                userType: userType
            })
            
            const addUser = await data.save()
            res.json('User added')
        }
    }
    catch(err){
        res.json(err)
    }
}

// login user
exports.loginUser = async(req, res) => {
    const username =  req.body.username;
    const password = req.body.password;

    try {
        const findUser = await User.findOne({ username: username })

        if(!findUser) res.json('Username not found')
        
        else{
            if(findUser.password == '') res.json('Invalid')
            
            else{
                bcrypt.compare(password, findUser.password, function(err, isMatch){
                    if(err) res.json('Invalid')
                    if(!isMatch) res.json('Invalid')
                    else{
                        const token = jwt.sign({ userId: findUser._id }, 'your_secret_key', { expiresIn: '1h' })
                        res.json(token)
                    }
                })
            }
        }
    }
    catch(err){
        res.json(err)
    }
}

//get user data
exports.getUserData = async(req, res) => {
    const username = req.body.username
    try{
        const findUser = await User.findOne({ username: username })
        if(!findUser) res.json('No user found')
        else res.json(findUser)
    }
    catch(err){
        res.json(err)
    }
}

//update movies
exports.updateWatchList = async(req, res) => {
    const username = req.body.username;
    const movies = req.body.movies;
    
    try{
        const findUser = await User.findOne({ username: username })

        if(!findUser) res.json('Username not found')
        
        else{
            const data = await User.updateOne(
                { _id: findUser._id },
                {
                    $set: {
                        movies: movies
                    }
                }
            )
            res.json(data)
        }
    }
    catch(err){
        res.json(err)
    }
}
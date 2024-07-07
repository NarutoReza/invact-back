const Movies = require('../Model/Movies');

exports.uploadFiles = async(req, res) => {
    try{
        if(req.files) res.json(req.files.photo[0].filename)
        else res.json('error')
    }
    catch(err){
        res.json(err)
    }
}

//add movie
exports.addMovie = async(req, res) => {
    const data = new Movies({
        photo: req.body.photo,
        title:  req.body.title,
        description: req.body.description,
        release_year: req.body.release_year,
        genre: req.body.genre,
        trailer: req.body.trailer
    })

    try{
        const findMovie = await Movies.findOne({ title: data.title })

        if(findMovie) res.json('Movie already exists in the database')
        else{
            const addMovie = await data.save()
            res.json('Done')
        }
    }
    catch(err){
        res.json(err)
    }
}

//get all movies list
exports.getAllMovies =  async(req, res) => {
    const sort = {createdAt: -1}
    const skip = parseInt(req.params.skip)
    try {
        const getAllMovies = await Movies.find().limit(10).sort(sort).skip(skip)
        res.json(getAllMovies)
    }
    catch(err){
        res.json(err)
    }
}

// get a single movie
exports.getMovie = async(req, res) => {
    try{
        const getMovie = await Movies.findOne({ _id: req.params.postId })
        res.json(getMovie)
    }
    catch(err){
        res.json(err)
    }
}

//update a movie
exports.updateMovie = async(req, res) => {
    try{
        const updateMovie = await Movies.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    description:req.body.description,
                    release_year: req.body.release_year,
                    genre: req.body.genre,
                    rating: req.body.rating,
                    photo: req.body.photo,
                    trailer: req.body.trailer
                }
            }
        )
        res.json(updateMovie)
    }
    catch(err){
        res.json(err)
    }
}

//delete a movie
exports.deleteMovie = async(req, res) => {
    try{
        const deleteMovie = await Movies.removeAllListeners({ _id: req.params.postId })
        res.json(deleteMovie)
    }
    catch(err){
        res.json(err)
    }
}

//get recommender movies
exports.recommendedMovies = async(req, res) => {
    const sort = {createdAt: -1}
    try{
        const recommendedMovies = await Movies.find().limit(10).sort(sort)
        res.json(recommendedMovies)
    }
    catch(err){
        res.json(err)
    }
}
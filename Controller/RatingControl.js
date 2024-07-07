const Rating = require('../Model/Rating')

// add rating
exports.addRating = async(req, res) => {
    const data = new Rating({
        rating: req.body.rating,
        review: req.body.review,
        userId: req.body.userId,
        movieId: req.body.movieId,
        username: req.body.username
    })
    try{
        const findRating = await Rating.findOne({ userId: data.userId, movieId: data.movieId })

        if(findRating) res.json('Rating and review already given')
        
        else{
            const addRating = await data.save()
            res.json(addRating)
        }
    }
    catch(err){
        res.json(err)
    }
}

//get rating for a single user
exports.getRatingForUser = async(req, res) => {
    const userId = req.body.userId
    const movieId = req.body.movieId
    try{
        const findRating = await Rating.findOne({ userId: userId, movieId: movieId })

        res.json(findRating)
    }
    catch(err){
        res.json(err)
    }
}

//get all ratings of a movie
exports.getAllRating = async(req, res) => {
    const movieId = req.body.movieId
    try{
        const findRating = await Rating.find({ movieId: movieId })

        res.json(findRating)
    }
    catch(err){
        res.json(err)
    }
}

//update a user rating
exports.updateRating = async(req, res) => {
    const userId = req.body.userId
    const movieId = req.body.movieId
    const rating = req.body.rating
    const review = req.body.review
    try{
        const findRating = await Rating.findOne({ userId: userId, movieId: movieId })

        if(!findRating) res.json('Rating not found')

        else{
            const updateRating = await Rating.updateOne(
                { _id: req.params.postId },
                {
                    $set: {
                        rating: rating,
                        review: review
                    }
                }
            )
            res.json(updateRating)
        }
    }
    catch(err){
        res.json(err)
    }
}

//delete a user rating
exports.deleteRating = async(req, res) => {
    // const userId = req.body.userId
    // const movieId = req.body.movieId
    // try{
    //     const findRating = await Rating.findOne({ userId: userId, movieId: movieId })

    //     res.json(findRating)
    // }
    // catch(err){
    //     res.json(err)
    // }
}
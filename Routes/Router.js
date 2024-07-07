const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('uploads'))
const verifyToken = require('../Middleware/authMiddleware')
const verifyAdmin = require('../Middleware/authAdminMiddleware')

const { addUser, loginUser, updateWatchList, getUserData } = require('../Controller/UserControl');

const { uploadFiles, addMovie, getAllMovies, getMovie, updateMovie, deleteMovie, recommendedMovies } = require('../Controller/MoviesControl')

const { addRating, getRatingForUser, getAllRating, updateRating, deleteRating } = require('../Controller/RatingControl')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') cb(null, 'uploads/photos')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') cb(null, true)
    else cb(null, false)
}

const uploadHandler = multer({
    storage, limits: { fileSize: 1024 * 1024 * 1 }, fileFilter: fileFilter
})

const multipleUploads = uploadHandler.fields([
    { name: 'photo', maxCount: 1}
])

router.post('/upload', multipleUploads, uploadFiles)

//login and signup user

router.post('/signup', addUser) //signup user
router.post('/login', loginUser) //login user

//get user data
router.post('/user', verifyToken, getUserData)

//update movies
router.patch('/updateWatchList', verifyToken, updateWatchList) //update watch list



///movies routes
router.get('/movies/skip=:skip', getAllMovies) //get all movies list
router.get('/movie/:postId', getMovie) //get a single movie
router.post('/addMovie', verifyToken, verifyAdmin, addMovie ) // add a movie
router.patch('/updateMovie/:postId', verifyToken, verifyAdmin, updateMovie) //update a movie 
router.delete('/deleteMovie/:postId', verifyToken, verifyAdmin, deleteMovie) //delete a movie
router.get('/recommendedMovies', recommendedMovies) // get recommended movies


//rating router
router.post('/addRating', verifyToken, addRating) // add rating
router.post('/userRating', verifyToken, getRatingForUser) // get single user rating
router.post('/movieRating', getAllRating) // get all the ratings of a movie
router.patch('/updateRating/:postId', verifyToken, updateRating) //update a movie rating
router.delete('/deleteRating/:postId', verifyToken, deleteRating) //delete a movie rating

module.exports = router
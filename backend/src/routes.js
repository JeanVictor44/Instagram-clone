const { Router } = require('express')
const routes = Router()
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

//Para o express entender os campos do multipart form data e fazer o upload de imagens
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig) 


routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)

routes.post('/posts/:id/like', LikeController.store)

module.exports = routes
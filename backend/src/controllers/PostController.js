const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
    //Retorna a lista de posts já cadastrados na base de dados
    async index( req, res ){
        const posts = await Post.find().sort('-createdAt')// - = ordem decrescente 
        res.json(posts)
    },

    //Cadastra posts
    async store(req,res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image} = req.file
        const [ name ] = image.split('.')
        const filename = `${name}.jpg`

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        fs.unlinkSync(req.file.path)// Para deletar e deixar apenas as imagens redimensionadas

        const post = await Post.create({
            author,
            place,
            description,
            hashtags, 
            image:filename
        })

        // O frontend poderá acessar essa mensagem em tempo real
        req.io.emit('post', post)// Emite esse evento para todos os usuários conectados na aplicação através do socket.io e em tempo real mostra o que foi atualizado
        return res.json(post)
    }
}
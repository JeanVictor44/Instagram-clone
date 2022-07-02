const mongoose = require('mongoose')

//Abstração da tabela Post do banco de dados
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // cria o campo da data de criação e de atualização
})

module.exports = mongoose.model('Post', PostSchema)
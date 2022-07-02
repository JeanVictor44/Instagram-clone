const Post = require('../models/Post')

module.exports = {
    //Cadastra posts
    async store(req,res) {
        const post = await Post.findById(req.params.id)
        post.likes += 1
        
        await post.save()
        req.io.emit('like', post)
        return res.json(post)
    }
}
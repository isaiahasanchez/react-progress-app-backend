const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;
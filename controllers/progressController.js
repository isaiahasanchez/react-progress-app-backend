const Post = require('../models/progressModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const createNewPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.send(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const editPost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            ...req.body,
            lastDateEdited: Date.now()
        },
         { new: true });
        res.send(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(422).send('Error updating post');
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).send('Post Deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getAllPosts,
    getOnePost,
    createNewPost,
    deletePost,
    editPost
};
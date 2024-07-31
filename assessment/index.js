const Post = require("../model/post.model")

async function createPost(req, res) {
    try {
            let post = new Post(req.body);
            await post.save();
            res.status(201).json({
                message: "post created", post
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function fetchAllPosts(req, res) {
    try {
        let posts = await Post.find()
        res.status(200).json({message: "posts fetched", posts});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function fetchPostById(req, res) {
    try {
        let post = await Post.findById(req.params.id)
        res.status(200).json({
            message: "post fetched by id", post
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function updatePost(req, res) {
    try {
        let postExists = await Post.findById(req.params.id);
        if (postExists) {
            await postExists.updateOne(req.body);
            res.status(201).json({
                message: "post updated",
                postExists
            });
        } else {
            res.status(404).json({
                message: "post does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function deletePost (req, res) {
    try {
        let postExists = await Post.findById(req.params.id);
        if (postExists) {
            await postExists.deleteOne(req.body);
            res.status(201).json({
                message: "post deleted",
                postExists
            });
        } else {
            res.status(404).json({
                message: "post does not exist",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        });
    }
}

async function unknownRoute(req, res) {
    try {
        res.status(404).json({
            message: "page not found"
        });
    } catch (error) {
        res.status(500).json({
            message: "server error"
        });
    }
}

module.exports = { unknownRoute, createPost, fetchAllPosts, updatePost, deletePost, fetchPostById };
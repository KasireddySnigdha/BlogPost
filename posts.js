const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.post('/', async (req, res) => {
  const { title, body, tags, published } = req.body;
  try {
    const post = new Post({ title, body, tags, published });
    await post.save();
    res.status(201).send({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(400).send({ error: 'Post creation failed' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body, tags, published } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, body, tags, published }, { new: true });
    res.send({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(400).send({ error: 'Post update failed' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.send({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Post deletion failed' });
  }
});


router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const posts = await Post.find().skip((page - 1) * limit).limit(Number(limit));
    const totalPosts = await Post.countDocuments();
    res.send({ currentPage: Number(page), totalPages: Math.ceil(totalPosts / limit), posts });
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch posts' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.send({ post });
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch post' });
  }
});

module.exports = router;

const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();


router.post('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  try {
    const newComment = new Comment({ postId, comment });
    await newComment.save();
    res.status(201).send({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(400).send({ error: 'Failed to add comment' });
  }
});

module.exports = router;

// implement your posts router here

const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');

// ENDPOINTS HERE

// GET - /
router.get('/', (req, res) => {
    Posts.find()
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ message: 'The posts information could not be retrieved' });
    })
});

// GET - /:id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Posts.findById(id)
    .then(post => {
        if (post) {
            throw new Error
            res.status(200).json(post);
        } else {
            res.status(400).json({ message: 'The post with the specified ID does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'The post information could not be retrieved' });
    })
});

// GET - /:id/comments

// POST - /
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' });
    } else {
        Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while saving the post to the database' });
        })
    }
});

// PUT - /:id

// DELETE - /:id

module.exports = router;
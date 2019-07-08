import models from "../models";


/**
 * Select the post by ID
 */
const selectPost = (req, res) => {
  const id = req.params.id;
  models.Post.findOne({ where: { id } }).then(post => {
    if (post) res.json({ success: true, post });
    else res.status(400).json({ success: false, error: "Post not found" });
  });
}

/**
 * Save new post
 */

const createPost = (req, res) => {
  let { title, body } = req.body;
  models.Post.create({ title, body })
    .then(post => res.json({ success: true, post: res.body }))
    .catch(err => res.status(422).send({ error: err }));
}

/**
 * Update the post by ID
 */

const updatePost = (req, res) => {
  const { id, title, body } = req.body;
  models.Post.update({ title, body }, { where: { id } })
    .then(post => res.json({ success: true, post }))
    .catch(err =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
}



/**
 * Delete post by ID
 */

const deletePost = (req, res) => {
  const id = req.params.id;
  models.Post.destroy({ where: { id } })
    .then(() => res.json({ success: true }))
    .catch(err =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
}


const getPosts = (req, res) => {
  models.Post.findAll({
    order: [["updatedAt", "ASC"]]
  }).then(response => {
    res.send(response);
  });
}

export default {selectPost, createPost, updatePost, deletePost, getPosts};

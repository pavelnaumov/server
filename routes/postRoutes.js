import express from 'express';
import postController from '../controllers/postController';

const router = express.Router();

router.get('/:id', postController.selectPost);
router.get('/', postController.getPosts);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
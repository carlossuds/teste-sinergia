/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import Post from '../schemas/Post';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
      author: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.body, ...req.params }))) {
      return res.status(400).json('Posts cannot be empty. Write something.');
    }

    const post = await Post.create({
      text: req.body.text,
      author: req.params.author,
    });

    return res.json(post);
  }

  async index(req, res) {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    return res.json(posts);
  }

  async show(req, res) {
    const posts = await Post.find({ author: req.params.author }).sort({
      createdAt: -1,
    });

    return res.json(posts);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Posts cannot be empty. Write something.');
    }

    const post = await Post.findById(req.params._id);

    await post.updateOne({
      text: req.body.text,
    });

    return res.json(post);
  }

  async destroy(req, res) {
    const post = await Post.findById(req.params._id);

    await post.remove();

    return res.json(`Post removed!`);
  }
}

export default new PostController();

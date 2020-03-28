import * as Yup from 'yup';

import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const userExists = await User.findOne({
      where: { email: req.body.email, username: req.body.username },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, username, email } = await User.create(req.body);

    return res.json({ id, username, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string().required().min(6),

      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const { oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      res.status(400).json({ error: 'Wrong password' });
    }

    const { password } = await user.update(req.body);

    return res.json({ password });
  }
}
export default new UserController();

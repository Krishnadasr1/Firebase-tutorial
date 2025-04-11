import express from 'express';
import User from '../models/user.js';
import { sendNotification } from '../services/notification.js';
import { uploadFile, deleteFile } from '../services/storage.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    fcmToken: req.body.fcmToken
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/fcm-token', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fcmToken: req.body.fcmToken },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/notify', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.fcmToken) {
      return res.status(404).json({ message: 'User or FCM token not found' });
    }

    const result = await sendNotification(
      user.fcmToken,
      req.body.title,
      req.body.body,
      req.body.data
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
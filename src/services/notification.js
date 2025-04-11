import { messaging } from '../config/firebase.js';

export const sendNotification = async (fcmToken, title, body, data = {}) => {
  try {
    const message = {
      notification: {
        title,
        body
      },
      data,
      token: fcmToken
    };

    const response = await messaging.send(message);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const sendMulticastNotification = async (tokens, title, body, data = {}) => {
  try {
    const message = {
      notification: {
        title,
        body
      },
      data,
      tokens
    };

    const response = await messaging.sendMulticast(message);
    return response;
  } catch (error) {
    console.error('Error sending multicast notification:', error);
    throw error;
  }
};
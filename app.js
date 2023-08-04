const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('C:\\Users\\HP\\AfcfServer\\afcfminna-firebase-adminsdk-ovt50-c8c643f9e3.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());
process.env.GOOGLE_APPLICATION_CREDENTIALS
const schedulePushNotification = (token, notificationTime) => {
  const now = new Date();
  const delay = notificationTime.getTime() - now.getTime();

  setTimeout(() => {
    sendPushNotification(token, 'Wake up!', 'Time to wake up!');
  }, delay);
};

const sendPushNotification = (token, title, body) => {
  const message = {
    notification: { title, body },
    token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent push notification:', response);
    })
    .catch((error) => {
      console.error('Error sending push notification:', error);
    });
};

app.post('/register-token', (req, res) => {
  const { token } = req.body;

  // Schedule push notifications for each alarm time
  setAlarms(token);

  res.json({ success: true, message: 'FCM Token registered successfully' });
});
// Set multiple alarm times and schedule push notifications
const setAlarms = (token) => {
  const alarmTimes = [
    new Date('2023-08-01T08:00:00'), // First alarm on August 1, 2023, at 8:00 AM (UTC time)
    new Date('2023-08-02T09:30:00'), // Second alarm on August 2, 2023, at 9:30 AM (UTC time)
    new Date('2023-08-03T12:15:00'), // Third alarm on August 3, 2023, at 12:15 PM (UTC time)
    // Add more alarm times as needed
  ];

  // Schedule push notifications for each alarm time
  alarmTimes.forEach((alarmTime) => {
    schedulePushNotification(token, alarmTime);
  });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

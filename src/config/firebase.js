const admin = require('firebase-admin');
const serviceAccount = require('./GoogleService-Account.json'); // Pastikan path benar

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://compens-442106.firebaseio.com" // Ganti dengan project ID Firebase Anda
});

module.exports = admin;

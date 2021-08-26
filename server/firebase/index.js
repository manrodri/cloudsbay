var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");  // to be mounted as a secret

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce-5eb9c.firebaseio.com",  // configMap ?
});

module.exports = admin;

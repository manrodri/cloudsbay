const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  try{
    console.log("VERIFYING FIREBASE USER")
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    console.log('FIREBASE USER: ', firebaseUser)
    req.user = firebaseUser;
    next()
  } catch (err){
    console.log(err)
    res.status(401).json({
      err: "Invalid or expired token"
    })
  }
};

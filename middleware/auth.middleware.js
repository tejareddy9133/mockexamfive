const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "reddy");
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.json({ msg: "not authunticated" });
      }
    } catch (error) {
      res.json({ msg: "not authenticated" });
    }
  } else {
    res.json({ msg: "please login again" });
  }
};

module.exports = {
  auth,
};

const auth = (req, res, next) => {
  console.log("ok");
  next();
};
module.exports = auth;

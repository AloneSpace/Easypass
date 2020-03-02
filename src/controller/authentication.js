module.exports = {
  checkLogin: (req, res) => {
    var testUsername = "AloneCoding";
    try {
      var username = req.body.username;
      if (username != testUsername) {
        res.json({ status: "failed" });
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ message: "Cannot get data from database." });
    }
  }
};

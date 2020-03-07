const mysql = require("mysql");
require("dotenv").config();

module.exports = {
  addDatabase: async (req, res) => {
    var vehicleID = req.body.vehicleID;
    var citizenID = req.body.citizenID;
    var fullname = req.body.fullname;
    var address = req.body.address;
    var vehicleRegistration = req.body.vehicleRegistration;
    var vehicleType = req.body.vehicleType;
    var entryDate = req.body.entryDate;
    var exitDate = req.body.exitDate;
    var comment = req.body.comment;
    var writeBy = req.body.writeBy;
    try {
      var connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user:
          process.env.USE_USER === "ROOT"
            ? process.env.DB_ROOT_USER
            : process.env.DB_USER,
        password:
          process.env.USE_USER === "ROOT"
            ? process.env.DB_ROOT_PASS
            : process.env.DB_USER_PASS,
        port: process.env.DB_PORT
      });
      connection.connect();
      connection.query(
        "INSERT INTO mainDB (vehicleID , citizenID, fullname, address, vehicleRegistration, vehicleType, entryDate, exitDate, comment, writeBy) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          vehicleID,
          citizenID,
          fullname,
          address,
          vehicleRegistration,
          vehicleType,
          entryDate,
          exitDate,
          comment,
          writeBy
        ],
        function(err, datas) {
          if (err) throw err;
          return res.json({ message: "success" });
        }
      );
    } catch (e) {
      if (e) throw e;
    }
  },
  getDatabase: async (req, res) => {
    try {
      var connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user:
          process.env.USE_USER === "ROOT"
            ? process.env.DB_ROOT_USER
            : process.env.DB_USER,
        password:
          process.env.USE_USER === "ROOT"
            ? process.env.DB_ROOT_PASS
            : process.env.DB_USER_PASS,
        port: process.env.DB_PORT
      });
      connection.connect();
      connection.query("SELECT * FROM mainDB", (err, results) => {
        if (err) throw err;
        connection.end();
        return res.json(results);
      });
    } catch (e) {
      return res.json({ message: e });
    }
  }
};

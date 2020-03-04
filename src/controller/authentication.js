const mysql = require("mysql");
require("dotenv").config();
const bcrypt = require("bcrypt");
var session = {};

module.exports = {
  getSession: async (req, res) => {
    return res.json(session);
  },
  getUsers: async (req, res) => {
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
      connection.query("SELECT * FROM auth", function(err, result) {
        if (err) throw err;
        connection.end();
        return res.json({
          users: result
        });
      });
    } catch (e) {
      return res.json({ message: e });
    }
  },
  addUser: async (req, res) => {
    var username = req.body.username;
    var password;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) throw err;
      password = hash;
    });
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
        "IF NOT EXISTS(SELECT * FROM auth WHERE username = ?) BEGIN INSERT INTO auth (username, password, name, type) VALUES (?,?,?,?)",
        [username, username, password, name, "user"],
        function(err, result) {
          if (err) throw err;
          connection.end();
          return res.json({
            message: result
          });
        }
      );
    } catch (e) {
      return res.json({ message: e });
    }
  },
  editUser: async (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var password;
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) throw err;
      password = hash;
    });
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
        "UPDATE auth SET username = ? and password = ? WHERE username = ?",
        [username, password, id],
        function(err, results) {
          connection.close();
          return res.json({ message: results });
        }
      );
    } catch (e) {
      return res.json({ message: e });
    }
  },
  deleteUser: async (req, res) => {
    var username = req.body.username;
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
        "DELETE FROM auth WHERE username = ?",
        [username],
        function(err, results) {
          if (err) throw err;
          return res.json({ message: results });
        }
      );
    } catch (e) {
      return res.json({ message: e });
    }
  },
  checkLogin: async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
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
        "SELECT * FROM auth WHERE username = ?",
        [username],
        function(error, results) {
          if (results.length == 0) return res.json({ message: "failed" });
          if (error) throw error;
          bcrypt.compare(password, results[0].password, function(err, result) {
            if (err) throw err;
            if (result == false) return res.json({ message: "failed" });
            //
            session.type = results[0].type;
            session.username = results[0].username;
            session.loggedin = true;
            connection.end();
            return res.json({
              message: "success"
            });
          });
        }
      );
    } catch (e) {
      return res.json({ message: e });
    }
  }
};

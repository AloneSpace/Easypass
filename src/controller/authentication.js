const mysql = require("mysql");
require("dotenv").config();
const bcrypt = require("bcrypt");
var session = {};

module.exports = {
  getSession: async (req, res) => {
    return res.json(session);
  },
  logout: async (req, res) => {
    session = {};
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
    try {
      var username = req.body.username;
      var fullname = req.body.fullname;
      const password = bcrypt.hashSync(req.body.password, 10);
      var connection = mysql.createConnection({
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
        function(err, result) {
          if (err) throw err;
          if (result.length != 0) return res.json({ message: "exist" });
          connection.query(
            "INSERT INTO auth (username, password, fullname, type) VALUES (?,?,?,?)",
            [username, password, fullname, "user"],
            function(newError, newResult) {
              if (newError) throw newError;
              connection.end();
              return res.json({ message: "success", result: newResult });
            }
          );
        }
      );
      return res.json({ password: hash });
    } catch (e) {
      if (e) throw e;
    }
  },
  editUser: async (req, res) => {
    try {
      var id = req.body.id;
      var username = req.body.username;
      var password = req.body.password;
      var fullname = req.body.fullname;
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
        port: process.env.DB_PORT,
        connectTimeout: 40000
      });
      connection.connect();
      connection.query(
        "SELECT * FROM auth WHERE username = ?",
        [username],
        function(err, result) {
          if (err) throw err;
          if (result.length != 0) {
            connection.end();
            if (result[0].id === id) {
              return res.json({
                message: "notupdate"
              });
            }
            //! ไม่มี Password
            return res.json({
              message: "exist"
            });
          } else {
            if (password) {
              //* มีPassword
              const passwordHash = bcrypt.hashSync(password, 10);
              connection.query(
                "UPDATE auth SET username = ?, fullname = ?, password = ? WHERE id = ?",
                [username, fullname, passwordHash, id],
                function(err, newResult) {
                  if (err) throw err;
                  connection.end();
                  return res.json({
                    message: "updatedwithnewPassword",
                    result: newResult
                  });
                }
              );
            }
            connection.query(
              "UPDATE auth SET username = ?, fullname = ? WHERE id = ?",
              [username, fullname, id],
              function(err, newResult) {
                if (err) throw err;
                connection.end();
                return res.json({
                  message: "updatedwithsamePassword",
                  result: newResult
                });
              }
            );
          }
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
          connection.end();
          return res.json({ message: "success", result: results });
        }
      );
    } catch (e) {
      return res.json({ message: e });
    }
  },
  checkLogin: async (req, res) => {
    try {
      var username = req.body.username;
      var password = req.body.password;
      var rememberme = req.body.rememberme ? true : false;
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
          if (error) throw error;
          if (results.length == 0) return res.json({ message: "failed" });
          bcrypt.compare(password, results[0].password, function(err, result) {
            if (err) throw err;
            if (result == false) return res.json({ message: "failed" });
            session.type = results[0].type;
            session.username = results[0].username;
            session.fullname = results[0].fullname;
            session.rememberme = rememberme;
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

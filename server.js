const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.port || 5000;

const { connection } = require("./db");
connection.connect();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.send("connected");
});

app.get("/login", (req, res) => {
  const sqlQuery = "SELECT * FROM USER;";
  connection.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.get(`/board/:board_id`, (req, response) => {
  const sqlQuery = `SELECT * FROM POST WHERE board_id=? ORDER BY post_id desc;`;
  connection.query(sqlQuery, req.params.board_id, (err, result) => {
    response.send(result);
  });
});

app.get(`/post/:post_id`, (req, response) => {
  var _url = req.url;
  const sqlQuery = `SELECT * FROM POST WHERE post_id = ?;`;
  connection.query(sqlQuery, req.params.post_id, (err, result) => {
    console.log("queryData", _url);
    console.log(result);
    response.send(result);
  });
});
/*
app.get(`/update_post/:post_id`, (req, response)=>{
    var _url = req.url;
    const sqlQuery = `UPDATE POST SET `
})
*/

app.get(`/delete_post/:post_id`, (req, response) => {
  var _url = req.url;
  const sqlQuery = `DELETE FROM POST WHERE post_id = ?;`;
  connection.query(sqlQuery, req.params.post_id, (err, result) => {
    response.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = connection;

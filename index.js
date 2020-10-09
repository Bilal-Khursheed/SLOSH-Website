var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./Slosh Site")));

app.get("/", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "./Slosh Site", "index.html"));
});
app.use(express.json({ extended: false }));
app.use("/app", require("./contactmail"));
app.listen(3000, function () {
  console.log("server is listning on port 3000");
});

"use strict";

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var data = _fs2.default.readFileSync("./store.json");
var words = JSON.parse(data);

app.use(_express2.default.static("public"));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.post("/text", function (request, response) {
  return console.log(request.body);
});

app.get("/all", function (request, response) {
  return response.send(words);
});
app.get("/add/:word/:score", function (request, response) {
  var params = request.params;
  var word = params.word;
  var score = params.score;

  words[word] = +score;

  _fs2.default.writeFile("./store.json", JSON.stringify(words, null, 2), function (_) {
    response.send({
      status: "success",
      word: word,
      score: score
    });
  });
});

var server = app.listen(3000, function (_) {
  return console.log("App Started");
});

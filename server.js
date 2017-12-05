import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const data = fs.readFileSync("./store.json");
const words = JSON.parse(data);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/text", (request, response) => console.log(request.body));

app.get("/all", (request, response) => response.send(words));
app.get("/add/:word/:score", (request, response) => {
  const params = request.params;
  const word = params.word;
  const score = params.score;

  words[word] = +score;

  fs.writeFile("./store.json", JSON.stringify(words, null, 2), _ => {
    response.send({
      status: "success",
      word: word,
      score: score
    });
  });
});

const server = app.listen(3000, _ => console.log("App Started"));

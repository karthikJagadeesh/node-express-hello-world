import "babel-polyfill";
import express from "express";

const app = express();
app.use(express.static("public"));

const appStarted = _ => {
  console.log("App Started");
};

const server = app.listen(3001, appStarted);

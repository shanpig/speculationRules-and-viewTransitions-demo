import express, { RequestHandler } from "express";
import cors from "cors";
import { DATA } from "./data";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));

// Speculation rules
app.get("/speculation/:filename.json", (req, res) => {
  res.set("Content-Type", "application/speculationrules+json");
  res.sendFile(__dirname + `/speculation-${req.params.filename}.json`);
});

// make api endpoints slow
const delayAPIPayload: RequestHandler = (req, res, next) => {
  if (req.url.includes("/api")) {
    setTimeout(next, 2000);
  } else {
    next();
  }
};
app.use(delayAPIPayload);

// API
app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Root page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

// Basic example
app.get("/examples/basic-example/:id", (req, res) => {
  res.sendFile(__dirname + `/pages/basic-example/page${req.params.id}.html`);
});

// Hold back animation
app.get("/examples/hold-back-animation/:id", (req, res) => {
  res.setHeader("Speculation-Rules", '"/speculation/hba.json"');
  res.sendFile(
    __dirname + `/pages/hold-back-animation/page${req.params.id}.html`
  );
});

// View transitions
app.get("/examples/view-transitions/", (req, res) => {
  res.sendFile(__dirname + "/pages/view-transitions/index.html");
});

app.get("/examples/view-transitions-2", (req, res) => {
  res.setHeader("Speculation-Rules", '"/speculation/vt.json"');
  res.sendFile(__dirname + "/pages/view-transitions-2/index.html");
});
app.get("/examples/view-transitions-2/:username", (req, res) => {
  res.setHeader("Speculation-Rules", '"/speculation/vt.json"');
  res.sendFile(
    __dirname + `/pages/view-transitions-2/${req.params.username}.html`
  );
});
app.get("/api/users/:username", (req, res) => {
  res.json(DATA[req.params.username]);
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

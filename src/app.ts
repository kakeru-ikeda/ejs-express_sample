import express from "express";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import crypto from "crypto";
import index from "./routes/index";

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.use("/", index);
app.use("/home", index);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
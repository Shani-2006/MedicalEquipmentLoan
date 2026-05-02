const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const { connectToMongo } = require("./db/mongoConnect");
const { errorHandler } = require("./middlewares/errorHandler");

const equipmentRoutes = require("./routes/equipmentRoutes");
const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: "medical-equipment-session",
  secret: process.env.SESSION_SECRET || "very-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  }
}));



app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/", viewRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

async function start() {
  await connectToMongo();
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}

start();

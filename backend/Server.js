require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("ThinkHub Backend is Running! 🚀");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

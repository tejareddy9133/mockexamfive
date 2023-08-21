const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { doctorRouter } = require("./routes/doctor.route");
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);
app.use(cors());

app.listen(5000, async () => {
  try {
    await connection;
    console.log(`db is connected in the port ${5000}`);
  } catch (error) {
    console.log(error.message);
  }
});

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const sequelize = require("./database/db.config");

const errorMiddleware = require("./middleware/error.middleware");

const userRouter = require("./routes/user.route");

dotenv.config();

const app = express();

sequelize
  .authenticate()
  .then(() =>
    console.log("Connection has been established successfully.".cyan.underline),
  )
  .catch((error) =>
    console.error(
      `Unable to connect to the database: ${error}`.red.underline.bold,
    ),
  );

sequelize
  .sync({ alter: true })
  .then(() => console.log("All models were synchronized successfully."));

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});

require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => console.log(`Connected the Database: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

  
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectToDb = require("./config/db.config");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
const projectRouter = require("./routes/project.routes");
const messageRouter = require("./routes/message.routes");


app.use("/", userRouter);
app.use("/", projectRouter);
app.use("/", messageRouter);

connectToDb().then(() => {
  app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
  )
})


const express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
const app = express()

// Body Parser Middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(
  cors({
    origin: "*",
  }),
)
// app.use(express.json{ limit: "50mb" }())
app.use(express.json({ limit: "150mb" }))

// Members API Routes
app.use("/api", require("./routes/apis/apis"))

const PORT = process.env.port || 5000

app.listen(PORT, () => console.log(`server on ${PORT}`))

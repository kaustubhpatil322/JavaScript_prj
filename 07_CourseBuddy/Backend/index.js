const express = require("express")
const cors = require("cors")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const app = express()
app.use(express.json())

app.use(cors());

app.use("/admin", adminRouter)
app.use("/user", userRouter)


app.listen(3000 , console.log("App listening on port = 3000"))


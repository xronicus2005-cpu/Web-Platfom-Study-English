import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { db } from "./config/db.js"

//routes
import userRoutes from "./routes/userRoutes.js"
import statRoutes from "./routes/statRoutes.js"

dotenv.config()

const app = express()
db.getConnection()
.then(conn => {
    console.log("DataBase Successfully connected!")
    conn.release()
})
.catch(err => console.error("DB connection Error: ", err))

//for working
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api", userRoutes)
app.use("/api", statRoutes)


//logout request

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} port`)
})
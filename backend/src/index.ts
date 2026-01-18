import express, { response } from "express";
import { PORT, mongoDBURL } from "./config";
import mongoose from "mongoose";
import  booksRoute  from "./routes/booksRoute";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "Delete"],
    allowedHeaders: ["Content-Type"],
})
)

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to Rayhan's first MERN stack project")
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App is connected to the databse")
    app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
});
})
.catch((error) => {
    console.log(error)
})
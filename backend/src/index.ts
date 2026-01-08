import express, { response } from "express";
import { PORT, mongoDBURL } from "./config";
import mongoose from "mongoose";
import { Book } from "./models/bookModels";
import { getSystemErrorMap } from "node:util";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to Rayhan's first MERN stack project")
})

app.get("/books", async (request, response) => {
    const books = await Book.find({})
    return response.status(200).json({
        count: books.length,
        data: books
    })
})

app.get("/books/:id", async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        response.status(200).send(book)

    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message)
            response.status(500).send({ message: error.message})
        }
    }
})

app.put("/books/:id", async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)

        // Fix this logic because message doesn't show up.
        if (!result) {
            return response.status(404).json( {message: "Book not found"} )
        }

        return response.status(200).send( {message: "Book sucessfully updated"} )
    } catch (error){
        if (error instanceof Error) {
            console.log(error.message)
            response.status(500).send({ message: error.message })
        }
    }
})

app.delete("/books/:id", async (request, response) => {
    try{
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id, request.body)

        if(!result){
            return response.status(404).json({ message: "Book not found" })
        }

        return response.status(200).send({ message: "Book successfully deleted" })

    } catch(error){
        if(error instanceof Error){
            console.log(error.message)
            response.status(500).send(error)
        }
    }
})

app.post("/books", async (request, response) => {
    
    try{
        if(!request.body.title || 
            !request.body.author || 
            !request.body.publishedYear
        ){
            return response.status(400).send({
                message: "Send all required field: title, author, publishedYear",
            })
        };

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear
        }

        const book = await Book.create(newBook)
        return response.status(201).send(book)

    } catch(error) {
        if (error instanceof Error){
            console.log(error.message)
            response.status(500).send({ message: error.message });
        }
    }
})

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
import express from 'express'
const router = express.Router()
import { Book } from "../models/bookModels";

router.get("/", async (request, response) => {
    const books = await Book.find({})
    return response.status(200).json({
        count: books.length,
        data: books
    })
})

router.get("/:id", async (request, response) => {
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

router.put("/:id", async (request, response) => {
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

router.delete("/:id", async (request, response) => {
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

router.post("/", async (request, response) => {
    
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

export default router;
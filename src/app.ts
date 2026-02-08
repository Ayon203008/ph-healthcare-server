import express, { Request, Response } from "express"
import { prisma } from "./app/lib/prisma";

const app = express()

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', async (req: Request, res: Response) => {

    const specialty = await prisma.specialty.create({
        data: {
            title: "My name is king Khan 12 "
        }
    })
    res.status(201).json({
        success: true,
        message: "API is working properly ",
        data: specialty

    })

    res.send('Hello, TypeScript + Express!');
});


export default app
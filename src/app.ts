import express, { Request, Response } from "express"
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";
const app = express()

app.use(express.json());
// * make sure always it will be top of the codes

app.use("/api/v1",IndexRoutes)
// * calling the function




// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies

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
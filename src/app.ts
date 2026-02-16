import express, {  Request, Response } from "express"
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorhandler";
import { notFound } from "./app/middleware/notFound";

const app = express()

app.use(express.json());
// * make sure always it will be top of the codes

app.use("/api/v1",IndexRoutes)
// * calling the function


app.use(express.urlencoded({ extended: true }));


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

// * make  Global error handler 

app.use(globalErrorHandler) // * give global error handeler here

app.use(notFound) // * Use notfound function here

export default app




import express, { Application, Request, Response } from "express";


const app = express();
const port = process.env.PORT || 8080;

app.get('/', (_, res: Response) => {
    res.send('🚀 Hello World from TypeScript 🚀');
});

app.listen(port, () => {
    console.log(`Application is listening at http://localhost:${port}`);
});
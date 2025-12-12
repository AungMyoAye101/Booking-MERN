
import dotenv from "dotenv";
import { Request, Response } from "express";
import app from "./app";
import { connectToDb } from "./utils/connectToDb";

dotenv.config()

const port = process.env.PORT || 8000;


app.get('/', (_req: Request, res: Response) => {
  res.json("Server is running on port " + port)
})


app.listen(port, () => {
  connectToDb();
  console.log(`server is listening on  http://localhost:${port}`);
});

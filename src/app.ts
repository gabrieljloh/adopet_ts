import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized");
        const router = require("./routes").default;
        router(app);
    })
    .catch((error) => {
        console.error("Error during Data Source initialization", error);
    });

export default app;
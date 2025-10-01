import express from "express";
import catalogRoutes from "./api/catalog.routes";
const app = express();
app.use(express.json());

app.use("/", catalogRoutes);

export default app;

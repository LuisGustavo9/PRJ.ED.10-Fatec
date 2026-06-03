import express from "express";
import cors from "cors";

import rotaRoutes from "./routes/rotaRoutes";
import cidadeRoutes from "./routes/cidadeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(rotaRoutes);
app.use(cidadeRoutes);
export default app;


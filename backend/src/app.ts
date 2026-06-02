import express from "express";
import cors from "cors";

import rotaRoutes from "./routes/rotaRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotaRoutes);

export default app;


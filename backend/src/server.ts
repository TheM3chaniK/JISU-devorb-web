import express from "express";
import "dotenv/config";
import phdschollerRouter from "@/routes/phdschollersRouter.js";
import documentRouter from "@/routes/document.routes.js";
import supervisorRouter from "@/routes/supervisor.routes.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/api/phd-scholar", phdschollerRouter);
app.use("/api/supervisor", supervisorRouter);
app.use("/api/docs/", documentRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});

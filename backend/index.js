import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import productRoutes from "./routes/productsRoute.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes);

// 404 error response
app.use((response) => {
  response.status(404).json({
    message: "route not found",
  });
});

// general error response
app.use((error, response) => {
  response.status(error.status || 500).json({
    message: error.message || "server error",
  });
});

// initial response
app.get("/", (response) => {
  response.send("<h1>Welcome</h1>");
});

app.listen(port, () => {
  console.log(`server is at http://localhost:${port}`);
});

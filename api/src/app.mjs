import express from "express";
import dotenv from "dotenv";
import userAuthRoutes from "./routes/userRoutes.auth.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import carRoutes from "./routes/carRoutes.mjs";
import servicePartRoutes from "./routes/servicePartRoutes.mjs";
import serviceRoutes from "./routes/serviceRoutes.mjs";

dotenv.config();

const app = express();

app.use(express.json());

// Base test route
app.get("/", (req, res) => {
  res.send("Car Management API is running!");
});

// Add user routes
app.use("/auth", userAuthRoutes);
app.use("/users", userRoutes);
app.use("/cars", carRoutes);
app.use("/service-parts", servicePartRoutes);
app.use("/service", serviceRoutes);

export default app;

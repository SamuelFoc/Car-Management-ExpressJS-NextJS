import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userAuthRoutes from "./routes/userRoutes.auth.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import carRoutes from "./routes/carRoutes.mjs";
import servicePartRoutes from "./routes/servicePartRoutes.mjs";
import serviceRoutes from "./routes/serviceRoutes.mjs";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all common HTTP methods
  allowedHeaders: "*", // Allow all headers
};
app.use(cors(corsOptions));

// Base test route
app.get("/", (req, res) => {
  res.send("Car Management API is running!");
});

// Add user routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/service-parts", servicePartRoutes);
app.use("/api/service", serviceRoutes);

export default app;

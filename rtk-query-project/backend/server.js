import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
const PORT = process.env.PORT || 4001;

// Connect to the database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to send form data

app.use("/api/users", userRoutes);

// Use Custom error middleware
app.use(notFound);
app.use(errorHandler);

// Running the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

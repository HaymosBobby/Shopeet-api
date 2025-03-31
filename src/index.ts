import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

// Database connection
import dbConnect from "./database/db";

// Middlewares - import
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import { corsOptions } from "./middlewares/cors.middleware";
import checkEnvVars from "./util/configValidator";

// Route - import
import authRoute from "./routes/auth.route";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Validate Environment Variables
checkEnvVars();

// Routes

app.use("/api/auth", authRoute);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from Shopeet!!!");
});

// Error handler middleware
app.use(errorMiddleware);

const connection = async () => {
  try {
    await dbConnect();

    const port: number = (process.env.PORT as number | undefined) || 3000;
    app.listen(port, () => console.log(`App is listening on port ${port}`));
  } catch (error: any) {
    console.error("Cannot connect to MongoDB to start the server", error);
    throw new Error("Cannot connect to MongoDB to start the server!");
  }
};

connection();

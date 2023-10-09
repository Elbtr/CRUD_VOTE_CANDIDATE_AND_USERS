import express, { Response } from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import { cloudinaryConfig } from "./config/configCloudinary";
// routes import
import PaslonRouter from "./routes/PaslonRouter";
import CandidateRouter from "./routes/CandidateRouter";
import VoteRouter from "./routes/VoteRouter";
import PartiesRouter from "./routes/PartiesRouter";
import UsersRouter from "./routes/UserRouter";
// middleware
import cookieParser from "cookie-parser";
import authUser from "./middleware/auth-users";
import { Request } from "express-serve-static-core";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 8000;

    const options: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
      ],
      credentials: true,
      methods: "GET,DELETE,PATCH,PUT,POST,",
      origin: process.env.API_ORIGIN,
      preflightContinue: false,
    };

    app.use(cors(options));
    app.use(express.json());
    // middleware
    app.use(cookieParser());
    // cloudinary config
    app.use("*", cloudinaryConfig);

    // app.use("/", (req: Request, res: Response): Response => {
    //   return res.status(200).json("welocome to my api");
    // });
    app.use("/api/v1", UsersRouter);
    app.use(authUser);
    app.use("/api/v1", PaslonRouter);
    app.use("/api/v1", CandidateRouter);
    app.use("/api/v1", VoteRouter);
    app.use("/api/v1", PartiesRouter);

    app.options("*", cors(options));

    app.listen(port, () => `Server started on port ${port}`);
  })
  .catch((error) => console.log(error));

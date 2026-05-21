import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.route';
import { fileRoutes } from './modules/file/file.route';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
// import appRouter from './app/routes/router';
// import notFound from './app/middlewares/notFound';
const app: Application = express();

app.use(
    cors({
        origin: ['*', 'http://localhost:3000'],
    }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);


// stating point
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'CloudVault Backend Running !',
        statusCode: 200,
    });
});

// global error handler
// app.use(globalErrorHandler);
// app.use(notFound);

export default app;
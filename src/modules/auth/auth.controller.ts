import { Request, Response } from "express";
import {
    registerUserService,
    loginUserService,
    getMeService,
} from "./auth.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await loginUserService(req.body);

        return res.status(200).json({
            success: true,
            token: result.token,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const getMe = async (req: Request & { user?: any },
    res: Response) => {
    try {
        const userdata = req.user;
        const user = await getMeService(userdata);
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
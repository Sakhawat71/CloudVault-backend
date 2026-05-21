import { Request, Response } from "express";
import {
  uploadFileService,
  getFilesService,
  deleteFileService,
} from "./file.service";

export const uploadFile = async (req: any, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await uploadFileService(file, req.user.id);

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getFiles = async (req: any, res: Response) => {
  try {
    const files = await getFilesService(req.user.id);

    return res.status(200).json({
      success: true,
      data: files,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteFile = async (req: any, res: Response) => {
  try {
    await deleteFileService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
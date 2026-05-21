import { Router } from "express";
import multer from "multer";
import {
    uploadFile,
    getFiles,
    deleteFile,
} from "./file.controller";
import { auth } from "../auth/auth.middleware";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post("/upload", auth, upload.single("file"), uploadFile);
router.get("/", auth, getFiles);
router.delete("/:id", auth, deleteFile);

export const fileRoutes = router;
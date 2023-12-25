import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UserController, DocumentController } from "../controllers/index.js";
import upload from "../utils/file_upload.js";
import authorization from "../middlewares/auth.js";

export const router: Router = Router();

router.post("/user/register", UserController.registerNewUser);
router.post("/user/login", UserController.login);

router.get('/user/:id', UserController.getUserProfile);

router.get("/docs/search", DocumentController.searchDocuments);

router.post("/docs/upload", authorization, upload.array('files', 10), DocumentController.createNewDocument);

router.get("/docs", DocumentController.getAllDocuments)
router.get("/docs/:id", DocumentController.getDocumentById)

router.patch("/docs/:id", authorization, DocumentController.editDocument)
router.delete("/docs/:id", authorization, DocumentController.deleteDocument)



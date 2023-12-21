// server/router/qaRoute.js
import express from "express";
import {
  generateQuestionsAndAnswers,
  saveQAToDatabase,
} from "../controllers/generateQnAController.js";

const router = express.Router();

router.get("/generateQnA", generateQuestionsAndAnswers);
router.post("/saveQAToDatabase", saveQAToDatabase);

export default router; // Ensure to export the router as the default export

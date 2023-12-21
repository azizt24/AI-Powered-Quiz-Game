import Question from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";

export const generateQuestionsAndAnswers = async (req, res, next) => {
  try {
    const generatedQnA = await generateQnA(); // Assuming generateQnA is imported
    res.json(generatedQnA);
  } catch (error) {
    console.error("Error generating Q&A:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveQAToDatabase = async (req, res, next) => {
  try {
    const questions = req.body.questions;
    const answers = req.body.answers;

    const question = new Question({ questions });
    await question.save();

    const result = new Result({ result: answers });
    await result.save();

    res.json({
      success: true,
      message: "Questions and answers saved successfully",
    });
  } catch (error) {
    console.error("Error saving questions and answers:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
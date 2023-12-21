import Question from "../models/questionModel.js";
import Result from "../models/resultModel.js";

export const saveQAToDatabase = async (req, res) => {
  try {
    const { questions, answers } = req.body;

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

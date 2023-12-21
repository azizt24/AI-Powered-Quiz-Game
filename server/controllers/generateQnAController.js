import generateQnA from "../middlewares/generateQnA.js";

export const generateQuestionsAndAnswers = async (req, res) => {
  try {
    const generatedQnA = await generateQnA();
    res.json(generatedQnA);
  } catch (error) {
    console.error("Error generating Q&A:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveQAToDatabase = async (req, res) => {
  // Your logic for saving Q&A to the database
};

// saveQuestionsToDatabase.js
import mongoose from "mongoose";
import Question from "../database/saveQuestionsToDatabase.js"; // Import your question model

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const saveQuestionsToDatabase = async (questions) => {
  try {
    await Question.deleteMany({}); // Clear existing questions
    const savedQuestions = await Question.create(questions);
    console.log("Questions saved to the database:", savedQuestions);
  } catch (error) {
    console.error("Error saving questions to the database:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

export default saveQuestionsToDatabase;

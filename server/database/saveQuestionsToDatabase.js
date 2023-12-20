// saveAnswersToDatabase.js
import mongoose from "mongoose";
import Answer from "../models/Answer.js"; // Adjust the path based on your project structure

mongoose.connect("mongodb://localhost:4000/results", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const saveAnswersToDatabase = async (answers) => {
  try {
    await Answer.deleteMany({}); // Clear existing answers
    const savedAnswers = await Answer.create(answers);
    console.log("Answers saved to the database:", savedAnswers);
  } catch (error) {
    console.error("Error saving answers to the database:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

export default saveAnswersToDatabase;

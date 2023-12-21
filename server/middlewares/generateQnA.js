// generateQnA.js
import OpenAI from "openai";

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateQnA = async () => {
  try {
    const configuration = {
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    };

    const openai = new OpenAI(configuration);
    const numQnAPairs = 5; // Specify the number of Q&A pairs

    const qnaPairs = [];

    for (let index = 0; index < numQnAPairs; index++) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content:
              "Create a multiple-choice question related to JavaScript. Provide four options, and mark one of them as the correct answer. The answers should be one word filling in the blanks.",
          },
        ],
        max_tokens: 200,
        n: 5,
        stop: ["###"],
        temperature: 1,
      });

      if (!response || !response.choices) {
        console.error("Unexpected response format:", response);
        return null;
      }

      const generatedContent = response.choices[0].message.content;
      const [question, correctAnswer, ...incorrectAnswers] =
        generatedContent.split("\n");

      // If correct answer is empty, make a separate call to OpenAI to generate it
      let actualCorrectAnswer =
        correctAnswer.trim() || (await generateCorrectAnswer(openai, question));

      // Remove any prefix from the correct answer
      actualCorrectAnswer = actualCorrectAnswer.replace(/^.*?: /, "");

      // Include answers in the object and shuffle them
      const answers = [
        { id: 1, answer: actualCorrectAnswer, isCorrect: true },
        { id: 2, answer: incorrectAnswers[1].trim() || "", isCorrect: false },
        { id: 3, answer: incorrectAnswers[2].trim() || "", isCorrect: false },
        { id: 4, answer: incorrectAnswers[3].trim() || "", isCorrect: false },
      ];

      shuffleArray(answers);

      qnaPairs.push({
        id: index + 1,
        question: question.replace("Question:", "").trim(),
        answers,
        correctAnswer: { id: 1, answer: actualCorrectAnswer, isCorrect: true },
      });
    }

    return qnaPairs;
  } catch (error) {
    console.error("Error generating Q&A pairs:", error.message);
    return null;
  }
};

// Function to generate the correct answer based on the question
const generateCorrectAnswer = async (openai, question) => {
  const correctAnswerResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `What is the correct one-word answer to the following question?\n${question}`,
      },
    ],
    max_tokens: 50,
    n: 1,
    stop: ["###"],
    temperature: 0,
  });

  return correctAnswerResponse.choices[0].message.content.trim();
};

export default generateQnA;
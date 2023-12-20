import generateQnA from "../database/generateQnA";

const testGenerateQnA = async () => {
  const generatedQnA = await generateQnA();
  console.log("Generated Q&A pairs:", generatedQnA);
};

testGenerateQnA();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { topic } = req.body;

    const prompt = generatePrompt(topic);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 4000
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(topic) {
  return `${topic}

`;
}

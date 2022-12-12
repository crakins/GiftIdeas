import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const { protagonist, conflict, resolution, location } = req.body;

    const prompt = generatePrompt(protagonist, conflict, resolution, location);

    console.log(prompt);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 2048
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(protagonist, conflict, resolution, location) {
return `Tell a short story about a ${protagonist} character involved in a ${conflict} conflict that reaches a ${resolution} resolution based in ${location}.

`
;
}

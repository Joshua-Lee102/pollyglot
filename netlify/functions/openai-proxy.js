const { Configuration, OpenAIApi } = require('openai');

exports.handler = async (event) => {
    console.log("Event body:", event.body);  // This will log the entire event, including the body.

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No data received' }),
        };
    }

    const { prompt, inputText } = JSON.parse(event.body);

    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }));

    try {
        const response = await openai.completions.create({
            model: "gpt-4-turbo-2024-04-09",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: inputText },
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: response.choices[0].message.content.trim() }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        console.error('OpenAI API error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

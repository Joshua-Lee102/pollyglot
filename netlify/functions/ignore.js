import OpenAI from 'openai';

exports.handler = async function(event, context) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: ""
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    const { prompt, inputText } = JSON.parse(event.body);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

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
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ message: response.choices[0].text})
        };
    } catch (error) {
        console.error('OpenAI API error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

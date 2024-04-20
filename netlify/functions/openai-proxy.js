const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
    // Early return for CORS preflight requests
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://main--pollyglot-josh.netlify.app", // Adjust to match the client URL
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: ""
        };
    }

    // Only proceed for POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405, // Method Not Allowed
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }

    const { prompt, inputText } = JSON.parse(event.body);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // Ensure this is securely configured
    });

    try {
        const response = await openai.completions.create({
            model: "gpt-4-turbo-2024-04-09",
            messages: [
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": inputText
                },
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
                "Access-Control-Allow-Origin": "https://main--pollyglot-josh.netlify.app"
            },
            body: JSON.stringify({ message: response.choices[0].message.content.trim() })
        };
    } catch (error) {
        console.error('OpenAI API error:', error); // Detailed error logging
        return {
            statusCode: error.response?.status || 500,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://main--pollyglot-josh.netlify.app"
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};

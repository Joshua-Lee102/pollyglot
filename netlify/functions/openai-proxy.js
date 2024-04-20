const { OpenAI } = require('openai');

exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "https://main--pollyglot-josh.netlify.app", // Adjust to match the client URL
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        body: JSON.stringify({ message: "CORS headers set!" })
    };

    const { prompt, inputText } = JSON.parse(event.body);


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
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

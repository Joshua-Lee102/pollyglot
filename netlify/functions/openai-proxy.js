const { Configuration, OpenAIApi } = require('openai');

exports.handler = async (event) => {
  const { prompt, inputText } = JSON.parse(event.body); // Assuming inputText is sent along with prompt

  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }));

  try {
    const response = await openai.completions.create({
        model: "gpt-4-turbo-2024-04-09",
        messages: [
          {
            role: "system",
            content: generatePrompt  // Prompt should likely include directives understood by the model
          },
          {
            role: "user",
            content: inputText  // Ensure this is the actual user input you want to process
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
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('OpenAI API error:', error); // Logging the error can help in debugging
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

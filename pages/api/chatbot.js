import { Configuration, OpenAIApi } from "openai";

/**
 * This function serves as an API endpoint that returns a JSON response containing
 * a chat history with a farming assistant chatbot. It receives an HTTP request,
 * checks that the request method is POST, retrieves data from the request body,
 * and creates a set of prompts to initiate a conversation with the OpenAI API.
 *
 * The function sends the prompts and any previous chat history to the OpenAI API
 * using the GPT-3.5-turbo language model. The API returns a message, which is
 * appended to the chat history and returned in the response body as a JSON array.
 *
 * The JSON request must include the following fields:
 *  - weather_data (object): The weather data came from internal API.
 *  - chat_data (object[]): The previous chat history came from this.
 */
export default async function handler(request, response) {
    if (request.method != 'POST') {
        response.status(405).send({ message: "Use HTTP POST request only." })
        return
    }

    const weatherData = request.body.weather_data ?? {}
    let chatData = request.body.chat_data ?? []

    const chatbotIdentity = "You are Soma a farming assistant chatbot."
    const chatbotWeatherData = "You are an expert farming assistant with a keen eye for details."
        + " Based on this JSON data: " + JSON.stringify(weatherData)
    const chatbotTask = "Considering I'm in the farm."
        + " Analyze if my plants needs irrigation."
        + " Analyze what I can plant with the current season and location."
        + " Analyze what the current weather will cause to my plants."
    const chatbotReply = "Make your reply short and clear"
        + " while not neglecting the necessary and not using abbreviations."
    const chatbotTranslation = "You will reply in the mother language used in my country."
        + " You will start with introducing yourself"
        + " while indicating the data is coming from external API"
        + " and end with \"Do you have anymore questions?\"."
    const chatbotReplyExample = "Example: Hello, I'm Soma your farming assistant."
        + " Based on my data ... Do you have anymore question?"
    const prompt = [
        { role: "system", content: chatbotIdentity },
        { role: "user", content: chatbotWeatherData },
        { role: "user", content: chatbotTask },
        { role: "user", content: chatbotReply },
        { role: "user", content: chatbotTranslation },
        { role: "user", content: chatbotReplyExample }
    ]

    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    const openai = new OpenAIApi(configuration)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...prompt, ...chatData],
        temperature: 0,
        top_p: 0
    })

    const message = completion.data.choices[0].message
    chatData = [
        ...chatData,
        message
    ]

    response.status(200).json([...chatData])
}

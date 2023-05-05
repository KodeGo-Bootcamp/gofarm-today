import { toHumanReadableTime } from "@/core/weather"

export default async function handler(request, response) {
    if (request.method != 'POST') {
        const message = `Endpoint expects POST got ${request.method} instead`
        response.status(405).send({ message })
        return
    }

    let weatherData = request.body.weather_data ?? ""

    if (!weatherData) {
        response.status(503).send({ message: "No data to analyze" })
        return
    }

    weatherData.datetime.current = toHumanReadableTime(weatherData.datetime.current + weatherData.datetime.zone_offset)
    weatherData.datetime.sunrise = toHumanReadableTime(weatherData.datetime.sunrise + weatherData.datetime.zone_offset)
    weatherData.datetime.sunset = toHumanReadableTime(weatherData.datetime.sunset + weatherData.datetime.zone_offset)
    weatherData.datetime.moonrise = toHumanReadableTime(weatherData.datetime.moonrise + weatherData.datetime.zone_offset)
    weatherData.datetime.moonset = toHumanReadableTime(weatherData.datetime.moonset + weatherData.datetime.zone_offset)
    delete weatherData.datetime.zone_offset

    const chatbotExpertPersona = "Take on a persona of a successful agronomist named Soma. "
    const chatbotInstruction = `Propose using the native language used in ${weatherData.address.country} `
    const chatbotTextFormatting = "a short and clear "
    const chatbotObjective = "recommendation if the crops requires watering today based on the weather data inside the JSON, "
        + "recommendation on what plant is good for the current season based on the date and location data inside the JSON, "
        + "recommendation if it is a good time to plant today based on the weather data, soil temperature data, and soil moisture data inside the JSON, "
        + "and infer unknown data to provide a suggestive result "
    const chatbotData = `using this JSON data\n${JSON.stringify(weatherData)}\n`
    const chatbotTone = "The tone should be suggestive and expert sounding like all the data is coming from you "
    const chatbotTargetAudience = "targeting farmers working on the field."

    const systemPrompt = "You are Soma a farming assistant chatbot."
    const userPrompt = chatbotExpertPersona
        + chatbotInstruction
        + chatbotTextFormatting
        + chatbotObjective
        + chatbotData
        + chatbotTone
        + chatbotTargetAudience
    const prompt = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
    ]

    response.json(prompt)
}

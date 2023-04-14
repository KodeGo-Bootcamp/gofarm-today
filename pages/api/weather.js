import axios from "axios"
import { toJsTimestamp, toDayName, toMonthName } from "@/core/weather"

/**
 * This function serves as an API endpoint that returns a JSON response
 * containing weather and geolocation data based on the latitude and
 * longitude coordinates provided in the request.
 *
 * The actual values for each field are dynamically generated based on
 * the latitude and longitude coordinates provided in the request,
 * and the availability of data from the external APIs.
 *
 * The JSON response includes the following fields:
 *  - day (string): The name of the day of the week.
 *  - month (string): The name of the month.
 *  - day_of_month (number): The day of the month.
 *  - year (number): The year.
 *  - hour_in_military (number): The hour in military time.
 *  - minute_in_military (number): The minute in military time.
 *  - country (string): The name of the country.
 *  - region (string): The name of the region.
 *  - state (string): The name of the state.
 *  - city (string): The name of the city.
 *  - cloudiness_in_percent (number): The cloudiness in percent.
 *  - dew_point_in_celcius (number): The dew point in Celsius.
 *  - humidity_in_percent (number): The humidity in percent.
 *  - atmospheric_pressure_in_hectopascal (number): The atmospheric pressure in hectopascal.
 *  - temperature_in_celcius (number): The temperature in Celsius.
 *  - uv_index (number): The UV index.
 *  - weather_description (string): The description of the weather.
 *  - weather_icon_id (string): The code of the weather icon.
 *  - wind_direction_in_degree (number): The wind direction in degrees.
 *  - wind_gust_in_meter_per_second (number): The wind gust in meters per second.
 *  - wind_speed_in_meter_per_second (number): The wind speed in meters per second.
 */
export default async function handler(request, response) {
    const { latitude, longitude } = request.query

    const exclude = "minutely,hourly,daily,alerts"
    const units = "metric"
    const openweatherUrl = `https://api.openweathermap.org/data/3.0/onecall`
        + `?lat=${latitude}`
        + `&lon=${longitude}`
        + `&appid=${process.env.OPENWEATHER_API_KEY}`
        + `&exclude=${exclude}`
        + `&units=${units}`
    const openweatherData = await axios.get(openweatherUrl).then((axiosResponse) => {
        return axiosResponse.data
    }).catch((error) => {
        if (error.response) {
            const message = error.response.data.message ?? "Unknown error occured"
            response.status(503).json({ message })
            return
        }

        if (error.request) {
            const message = error.message
            response.status(503).json({ message })
            return
        }

        response.status(503).json({ message: "Something went wrong" })
    })

    const geocodeUrl = `https://geocode.maps.co/reverse`
        + `?lat=${latitude}`
        + `&lon=${longitude}`
    const geocodeData = await axios.get(geocodeUrl).then((axiosResponse) => {
        if (axiosResponse.data.error) {
            const message = axiosResponse.data.error
            response.status(503).json({ message })
            return
        }

        return axiosResponse.data
    }).catch((error) => {
        if (error.response) {
            const message = error.response.data.error?.message ?? "Unknown error occured"
            response.status(503).json({ message })
            return
        }

        if (error.request) {
            const message = error.message
            response.status(503).json({ message })
            return
        }

        response.status(503).json({ message: "Something went wrong" })
    })

    if (response.statusCode != 200) {
        return
    }

    const timestamp = openweatherData?.current.dt ?? ""
    const date = new Date(toJsTimestamp(timestamp))
    const day = toDayName(date.getDay())
    const month = toMonthName(date.getMonth())
    const day_of_month = date.getDate()
    const year = date.getFullYear()
    const hour_in_military = date.getHours()
    const minute_in_military = date.getMinutes()
    const country = geocodeData?.address.country ?? ""
    const region = geocodeData?.address.region ?? ""
    const state = geocodeData?.address.state ?? ""
    const city = geocodeData?.address.city ?? geocodeData?.address.town ?? ""
    const cloudiness_in_percent = openweatherData?.current.clouds ?? ""
    const dew_point_in_celcius = openweatherData?.current.dew_point ?? ""
    const humidity_in_percent = openweatherData?.current.humidity ?? ""
    const atmospheric_pressure_in_hectopascal = openweatherData?.current.pressure ?? ""
    const temperature_in_celcius = openweatherData?.current.temp ?? ""
    const uv_index = openweatherData?.current.uvi ?? ""
    const weather_description = openweatherData?.current.weather[0].description ?? ""
    const weather_icon_id = openweatherData?.current.weather[0].icon ?? ""
    const wind_direction_in_degree = openweatherData?.current.wind_deg ?? ""
    const wind_gust_in_meter_per_second = openweatherData?.current.wind_gust ?? ""
    const wind_speed_in_meter_per_second = openweatherData?.current.wind_speed ?? ""
    const weatherData = {
        day,
        month,
        day_of_month,
        year,
        hour_in_military,
        minute_in_military,
        country,
        region,
        state,
        city,
        cloudiness_in_percent,
        dew_point_in_celcius,
        humidity_in_percent,
        atmospheric_pressure_in_hectopascal,
        temperature_in_celcius,
        uv_index,
        weather_description,
        weather_icon_id,
        wind_direction_in_degree,
        wind_gust_in_meter_per_second,
        wind_speed_in_meter_per_second
    }

    response.json({ ...weatherData })
}

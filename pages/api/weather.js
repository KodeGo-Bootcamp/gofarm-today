import axios from "axios"
import { toJsTimestamp, toMoonPhaseName } from "@/core/weather"

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
 * - datetime.zone_offset (number): The time zone offset value
 * - datetime.current (number): The current datetime in Unix timestamp format
 * - datetime.sunrise (number): The sunrise time in Unix timestamp format
 * - datetime.sunset (number): The sunset time in Unix timestamp format
 * - datetime.moonrise (number): The moonrise time in Unix timestamp format
 * - datetime.moonset (number): The moonset time in Unix timestamp format
 * - moon_phase (string): The phase of the moon
 * - temperature.morning (number): The morning temperature in Celsius
 * - temperature.day (number): The daytime temperature in Celsius
 * - temperature.evening (number): The evening temperature in Celsius
 * - temperature.night (number): The nighttime temperature in Celsius
 * - temperature.minimum (number): The minimum temperature in Celsius
 * - temperature.maximum (number): The maximum temperature in Celsius
 * - feels_like_temperature.morning (number): The morning "feels-like" temperature in Celsius
 * - feels_like_temperature.day (number): The daytime "feels-like" temperature in Celsius
 * - feels_like_temperature.evening (number): The evening "feels-like" temperature in Celsius
 * - feels_like_temperature.night (number): The nighttime "feels-like" temperature in Celsius
 * - atmospheric_pressure (number): The atmospheric pressure in hPa (hectopascals)
 * - humidity (number): The relative humidity percentage
 * - dew_point (number): The dew point temperature in Celsius
 * - wind.speed (number): The wind speed in meters per second
 * - wind.gust (number): The wind gust speed in meters per second (if available, otherwise an empty string)
 * - wind.direction (number): The wind direction in degrees
 * - cloudiness (number): The cloudiness percentage
 * - uv_index (number): The UV index value
 * - precipitation_probability (number): The probability of precipitation as a percentage
 * - rain_volume (number): The rain volume in millimeters (if available, otherwise an empty string)
 * - snow_volume (number): The snow volume in millimeters (if available, otherwise an empty string)
 * - weather.id (number): The weather condition ID
 * - weather.main (string): The general weather condition name
 * - weather.description (string): The detailed weather condition description
 * - weather.icon (string): The weather icon ID
 * - soil_temperature.measurement_unit (string): The measurement unit used for soil temperature
 * - soil_temperature.at_0cm_depth.average (number): The average soil temperature at a depth of 0cm
 * - soil_temperature.at_0cm_depth.minimum (number): The minimum soil temperature at a depth of 0cm
 * - soil_temperature.at_0cm_depth.maximum (number): The maximum soil temperature at a depth of 0cm
 * - soil_temperature.at_6cm_depth.average (number): The average soil temperature at a depth of 6cm
 * - soil_temperature.at_6cm_depth.minimum (number): The minimum soil temperature at a depth of 6cm
 * - soil_temperature.at_6cm_depth.maximum (number): The maximum soil temperature at a depth of 6cm
 * - soil_temperature.at_18cm_depth.average (number): The average soil temperature at a depth of 18cm
 * - soil_temperature.at_18cm_depth.minimum (number): The minimum soil temperature at a depth of 18cm
 * - soil_temperature.at_18cm_depth.maximum (number): The maximum soil temperature at a depth of 18cm
 * - soil_moisture.measurement_unit (string): The measurement unit used for soil moisture
 * - soil_moisture.at_0_to_1cm_depth.average (number): The average soil moisture at a depth of 0-1cm
 * - soil_moisture.at_0_to_1cm_depth.minimum (number): The minimum soil moisture at a depth of 0-1cm
 * - soil_moisture.at_0_to_1cm_depth.maximum (number): The maximum soil moisture at a depth of 0-1cm
 * - soil_moisture.at_1_to_3cm_depth.average (number): The average soil moisture at a depth of 1-3cm
 * - soil_moisture.at_1_to_3cm_depth.minimum (number): The minimum soil moisture at a depth of 1-3cm
 * - soil_moisture.at_1_to_3cm_depth.maximum (number): The maximum soil moisture at a depth of 1-3cm
 * - soil_moisture.at_3_to_9cm_depth.average (number): The average soil moisture at a depth of 3-9cm
 * - soil_moisture.at_3_to_9cm_depth.minimum (number): The minimum soil moisture at a depth of 3-9cm
 * - soil_moisture.at_3_to_9cm_depth.maximum (number): The maximum soil moisture at a depth of 3-9cm
 * - soil_moisture.at_9_to_27cm_depth.average (number): The average soil moisture at a depth of 9-27cm
 * - soil_moisture.at_9_to_27cm_depth.minimum (number): The minimum soil moisture at a depth of 9-27cm
 * - soil_moisture.at_9_to_27cm_depth.maximum (number): The maximum soil moisture at a depth of 9-27cm
 * - address.full (string): The full address string
 * - address.state (string): The state or province name
 * - address.country (string): The country name
 * - address.country_code (string): The two-letter country code
 */
export default async function handler(request, response) {
    const { latitude, longitude } = request.query

    const exclude = "minutely,hourly,alerts"
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

    const weatherVariables = "soil_temperature_0cm"
        + ",soil_temperature_6cm"
        + ",soil_temperature_18cm"
        + ",soil_moisture_0_1cm"
        + ",soil_moisture_1_3cm"
        + ",soil_moisture_3_9cm"
        + ",soil_moisture_9_27cm"
    const timeformat = "unixtime"
    const forecast_days = "1"
    const timezone = "auto"
    const openmeteoUrl = `https://api.open-meteo.com/v1/forecast`
        + `?latitude=${latitude}`
        + `&longitude=${longitude}`
        + `&hourly=${weatherVariables}`
        + `&timeformat=${timeformat}`
        + `&forecast_days=${forecast_days}`
        + `&timezone=${timezone}`
    const openmeteoData = await axios.get(openmeteoUrl).then((axiosResponse) => {
        /**
         * Get the average of values
         * @param {Number} values Array of values
         * @returns Average
         */
        const computeAverage = (values) => {
            const total = values.reduce((a, b) => { return a + b })
            const average = total / values.length
            return average
        }

        const soil_temperature = {
            measurement_unit: axiosResponse.data.hourly_units.soil_temperature_0cm,
            at_0cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_temperature_0cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_temperature_0cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_temperature_0cm)
            },
            at_6cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_temperature_6cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_temperature_6cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_temperature_6cm)
            },
            at_18cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_temperature_18cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_temperature_18cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_temperature_18cm)
            }
        }

        const soil_moisture = {
            measurement_unit: axiosResponse.data.hourly_units.soil_moisture_0_1cm,
            at_0_to_1cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_moisture_0_1cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_moisture_0_1cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_moisture_0_1cm)
            },
            at_1_to_3cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_moisture_1_3cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_moisture_1_3cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_moisture_1_3cm)
            },
            at_3_to_9cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_moisture_3_9cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_moisture_3_9cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_moisture_3_9cm)
            },
            at_9_to_27cm_depth: {
                average: computeAverage(axiosResponse.data.hourly.soil_moisture_3_9cm),
                minimum: Math.min(...axiosResponse.data.hourly.soil_moisture_3_9cm),
                maximum: Math.max(...axiosResponse.data.hourly.soil_moisture_3_9cm)
            }
        }

        return { soil_temperature, soil_moisture }
    }).catch((error) => {
        if (error.response) {
            const message = error.response.data.reason ?? "Unknown error occured"
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

    const weatherData = {
        datetime: {
            zone_offset: toJsTimestamp(openweatherData.timezone_offset),
            current: toJsTimestamp(openweatherData.current.dt),
            sunrise: toJsTimestamp(openweatherData.daily[0].sunrise),
            sunset: toJsTimestamp(openweatherData.daily[0].sunset),
            moonrise: toJsTimestamp(openweatherData.daily[0].moonrise),
            moonset: toJsTimestamp(openweatherData.daily[0].moonset)
        },
        moon_phase: toMoonPhaseName(openweatherData.daily.moon_phase),
        temperature: {
            morning: openweatherData.daily[0].temp.morn,
            day: openweatherData.daily[0].temp.day,
            evening: openweatherData.daily[0].temp.eve,
            night: openweatherData.daily[0].temp.night,
            minimum: openweatherData.daily[0].temp.min,
            maximum: openweatherData.daily[0].temp.max
        },
        feels_like_temperature: {
            morning: openweatherData.daily[0].feels_like.morn,
            day: openweatherData.daily[0].temp.day,
            evening: openweatherData.daily[0].temp.eve,
            night: openweatherData.daily[0].temp.night,
        },
        atmospheric_pressure: openweatherData.daily[0].pressure,
        humidity: openweatherData.daily[0].humidity,
        dew_point: openweatherData.daily[0].dew_point,
        wind: {
            speed: openweatherData.daily[0].wind_speed,
            gust: openweatherData.daily[0].wind_gust ?? "",
            direction: openweatherData.daily[0].wind_deg
        },
        cloudiness: openweatherData.daily[0].clouds,
        uv_index: openweatherData.daily[0].uvi,
        precipitation_probability: openweatherData.daily[0].pop * 100,
        rain_volume: openweatherData.daily[0].rain ?? "",
        snow_volume: openweatherData.daily[0].snow ?? "",
        weather: {
            id: openweatherData.daily[0].weather[0].id,
            main: openweatherData.daily[0].weather[0].main,
            description: openweatherData.daily[0].weather[0].description,
            icon: openweatherData.daily[0].weather[0].icon
        },
        ...openmeteoData,
        address: {
            full: geocodeData.display_name,
            state: geocodeData.address.state ?? geocodeData.address.state_district,
            country: geocodeData.address.country,
            country_code: geocodeData.address.country_code
        }
    }

    response.json({ ...weatherData })
}

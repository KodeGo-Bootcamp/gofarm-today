import axios from 'axios'
import { useEffect, useState } from 'react'
import { useWeatherDataReducer } from './WeatherDataContext'

export default function WeatherFrame() {
    const [location, setLocation] = useState()
    const [weatherData, weatherDataDispatch] = useWeatherDataReducer()

    useEffect(() => {
        const useInternalAPI = ({ coords }) => {
            const { latitude, longitude } = coords
            setLocation({ latitude, longitude })
        }

        const useExternalAPI = () => {
            const url = `https://ipapi.co/json`
            axios.get(url).then((axiosResponse) => {
                const { latitude, longitude } = axiosResponse.data
                setLocation({ latitude, longitude })
            })
        }

        if (!navigator.geolocation) {
            useExternalAPI()
            return
        }

        navigator.geolocation.getCurrentPosition(useInternalAPI, useExternalAPI)
    }, [])

    useEffect(() => {
        if (!location) {
            return
        }

        const { latitude, longitude } = location
        const url = `/api/weather`
            + `?latitude=${latitude}`
            + `&longitude=${longitude}`
        axios.get(url).then((axiosResponse) => {
            weatherDataDispatch({ type: "UPDATE", data: { ...axiosResponse.data } })
        })
    }, [location])

    return (
        <pre>
            {JSON.stringify(weatherData, null, 4)}
        </pre>
    )
}

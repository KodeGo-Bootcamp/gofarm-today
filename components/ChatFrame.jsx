import axios from "axios";
import { useEffect, useState } from "react";
import { useWeatherDataReducer } from "./WeatherDataContext";

export default function ChatFrame() {
    const [weatherData, weatherDataDispatch] = useWeatherDataReducer()
    const [chatData, setChatData] = useState()
    const [message, setMessage] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!message) {
            return
        }

        const url = `/api/chatbot`
        const data = {
            weather_data: weatherData,
            chat_data: [...chatData, { role: "user", content: message }]
        }
        axios.post(url, data).then((axiosResponse) => {
            setChatData([...axiosResponse.data])
        })

        setChatData([...chatData, { role: "user", content: message }])
        setMessage("")
    }

    useEffect(() => {
        if (!weatherData) {
            return
        }

        const url = `/api/chatbot`
        const data = {
            weather_data: weatherData,
            chat_data: chatData
        }
        axios.post(url, data).then((axiosResponse) => {
            setChatData([...axiosResponse.data])
        })
    }, [weatherData])

    return (
        <div>
            <pre>
                {JSON.stringify(chatData, null, 4)}
            </pre>
            <form onSubmit={handleSubmit}>
                <textarea placeholder={"Message"} value={message} onChange={(event) => { setMessage(event.target.value) }} />
                <br />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

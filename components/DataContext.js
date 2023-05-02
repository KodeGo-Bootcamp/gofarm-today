import { createContext, useContext, useReducer } from "react";

const WeatherDataContext = createContext()
const WeatherDataDispatchContext = createContext()

function weatherDataReducer(state, action) {
    switch (action.type) {
        case "UPDATE":
            return {
                ...action.data
            }
        default:
            throw Error("Unknown action: " + action.type)
    }
}

export function useWeatherDataReducer() {
    return [useContext(WeatherDataContext), useContext(WeatherDataDispatchContext)]
}

export function DataProvider({ children }) {
    const [weatherData, weatherDataDispatch] = useReducer(weatherDataReducer)

    return (
        <WeatherDataContext.Provider value={weatherData}>
            <WeatherDataDispatchContext.Provider value={weatherDataDispatch}>
                {children}
            </WeatherDataDispatchContext.Provider>
        </WeatherDataContext.Provider>
    )
}
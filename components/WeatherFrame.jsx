import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Image, Modal, Row } from 'react-bootstrap'
import { toHumanReadableTime } from '@/core/weather'
import { useWeatherDataReducer } from './DataContext'
import LoadingFrame from './LoadingFrame'

export default function WeatherFrame() {
    const [isRequesting, setIsRequesting] = useState(false)
    const [location, setLocation] = useState()
    const [weatherData, weatherDataDispatch] = useWeatherDataReducer()

    const RequestFrame = () => {
        const useInternalAPI = ({ coords }) => {
            const { latitude, longitude } = coords
            setLocation({ latitude, longitude })
        }

        const useExternalAPI = () => {
            const url = `https://ipapi.co/json`
            axios.get(url).then((axiosResponse) => {
                const { latitude, longitude } = axiosResponse.data
                if (latitude && longitude) {
                    setLocation({ latitude, longitude })
                    return
                }
                setLocation({ latitude: 14.5995, longitude: 120.9842 })
            })
        }

        const handleOnHide = () => {
            setIsRequesting(false)
            useExternalAPI()
        }

        const handleRequestAccess = () => {
            setIsRequesting(false)
            if (!navigator.geolocation) {
                useExternalAPI()
                return
            }
            navigator.geolocation.getCurrentPosition(useInternalAPI, useExternalAPI)
        }

        return (
            <Modal show={isRequesting} onHide={handleOnHide} backdrop={"static"} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Welcome to our site!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We want to provide you with the most accurate weather information to
                    help you plan your day. To do that, we need your permission to  access
                    your location. Don't worry, we won't share your information with anyone.
                </Modal.Body>
                <Modal.Body>
                    After clicking the button below, you'll see a prompt asking you
                    to allow location access. Please select 'Allow' to continue.
                </Modal.Body>
                <Modal.Body>
                    Thank you for choosing us to be your go-to source for weather updates!
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRequestAccess} variant={"outline-dark"}>
                        Request Access
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const WeatherCard = ({ condition, value }) => {
        return (
            <Card>
                <Card.Body className={"d-flex justify-content-between"}>
                    <Card.Text className={"m-0"}>
                        {condition}
                    </Card.Text>
                    <Card.Text>
                        {value}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const WeatherCardGroup = () => {
        const degreeToCompass = (degree) => {
            const value = Math.floor((degree / 22.5) + 0.5)
            const compassDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
            return compassDirections[value % 16]
        }

        const minifyFullAddress = (fullAddress) => {
            const splits = weatherData.address.country.split(" / ")
            const minifiedFullAddress = fullAddress.replace(weatherData.address.country, splits[splits.length - 1])
            return minifiedFullAddress
        }

        const getIconUrl = (iconId) => {
            const iconUrl = ` https://openweathermap.org/img/wn`
                + `/${iconId}@2x.png`
            return iconUrl
        }

        return (
            <CardGroup className={"my-2"}>
                <Container>
                    <Card>
                        <Card.Header>
                            {minifyFullAddress(weatherData.address.full)}
                        </Card.Header>
                    </Card>
                </Container>
                <Container>
                    <Card className={"my-1"}>
                        <Card.Body className={"d-flex justify-content-between"}>
                            <Card.Text className='m-0'>
                                <Image src={getIconUrl(weatherData.weather.icon)} width={70} height={70} alt={"weather icon"} />
                                {weatherData.weather.main}
                            </Card.Text>
                            <Card.Text className="align-self-center">
                                {weatherData.weather.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
                <Container>
                    <Row xs={1} md={2} lg={3}>
                        {[
                            {
                                condition: "Precipitation",
                                value: weatherData.precipitation_probability + "%"
                            },
                            {
                                condition: "Rain Volume",
                                value: weatherData.rain_volume ? weatherData.rain_volume + "mm" : "N/A"
                            },
                            {
                                condition: "Snow Volume",
                                value: weatherData.snow_volume ? weatherData.snow_volume + "mm" : "N/A"
                            },
                            {
                                condition: "UV Index",
                                value: weatherData.uv_index
                            },
                            {
                                condition: "Cloudiness",
                                value: weatherData.cloudiness + "%"
                            },
                            {
                                condition: "Moon Phase",
                                value: weatherData.moon_phase
                            },
                            {
                                condition: "Pressure",
                                value: weatherData.atmospheric_pressure + "hPa"
                            },
                            {
                                condition: "Humidity",
                                value: weatherData.humidity + "%"
                            },
                            {
                                condition: "Dew Point",
                                value: weatherData.dew_point + "℃"
                            },
                            {
                                condition: "Wind Speed",
                                value: weatherData.wind.speed + "m/s"
                            },
                            {
                                condition: "Wind Gust",
                                value: weatherData.wind.gust ? weatherData.wind.gust + "m/s" : "N/A"
                            },
                            {
                                condition: "Wind Direction",
                                value: degreeToCompass(weatherData.wind.direction)
                            }
                        ].map(({ condition, value }) => {
                            return (
                                <Col>
                                    <WeatherCard condition={condition} value={value} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </CardGroup>
        )
    }

    const TimeCard = ({ occurence, time }) => {
        return (
            <Card className={"text-center my-1"}>
                <Card.Body>
                    <Card.Title>
                        {occurence}
                    </Card.Title>
                    <Card.Text>
                        {time}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const TimeCardGroup = () => {
        return (
            <CardGroup className={"my-1"}>
                <Container>
                    <Row xs={1} sm={2} xl={4}>
                        {[
                            {
                                occurence: "Sunrise",
                                time: toHumanReadableTime(weatherData.datetime.sunrise + weatherData.datetime.zone_offset)
                            },
                            {
                                occurence: "Sunset",
                                time: toHumanReadableTime(weatherData.datetime.sunset + weatherData.datetime.zone_offset)
                            },
                            {
                                occurence: "Moonrise",
                                time: toHumanReadableTime(weatherData.datetime.moonrise + weatherData.datetime.zone_offset)
                            },
                            {
                                occurence: "Moonset",
                                time: toHumanReadableTime(weatherData.datetime.moonset + weatherData.datetime.zone_offset)
                            }
                        ].map(({ occurence, time }) => {
                            return (
                                <Col>
                                    <TimeCard occurence={occurence} time={time} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </CardGroup>
        )
    }

    const TemperatureCard = ({ timePeriod, temperature, feelsLike }) => {
        return (
            <Card className={"text-center my-1"}>
                <Card.Header>
                    {timePeriod}
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {"Temperature"}
                    </Card.Title>
                    <Card.Text>
                        {temperature + "℃"}
                    </Card.Text>
                    <Card.Title>
                        {"Feels Like"}
                    </Card.Title>
                    <Card.Text>
                        {feelsLike + "℃"}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    const TemperatureCardGroup = () => {
        return (
            <CardGroup className={"my-1"}>
                <Container>
                    <Row xs={2} md={4}>
                        {[
                            {
                                time_period: "Morning",
                                temperature: weatherData.temperature.morning,
                                feels_like: weatherData.feels_like_temperature.morning
                            },
                            {
                                time_period: "Day",
                                temperature: weatherData.temperature.day,
                                feels_like: weatherData.feels_like_temperature.day
                            },
                            {
                                time_period: "Evening",
                                temperature: weatherData.temperature.evening,
                                feels_like: weatherData.feels_like_temperature.evening
                            },
                            {
                                time_period: "Night",
                                temperature: weatherData.temperature.night,
                                feels_like: weatherData.feels_like_temperature.night
                            }
                        ].map(({ time_period, temperature, feels_like }) => {
                            return (
                                <Col>
                                    <TemperatureCard
                                        timePeriod={time_period}
                                        temperature={temperature}
                                        feelsLike={feels_like}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </CardGroup>
        )
    }

    const WeatherFrame = () => {
        return (
            <>
                <WeatherCardGroup />
                <TimeCardGroup />
                <TemperatureCardGroup />
            </>
        )
    }

    useEffect(() => {
        setIsRequesting(true)
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
        <>
            <RequestFrame />
            {weatherData ? <WeatherFrame /> : <LoadingFrame />}
        </>
    )
}

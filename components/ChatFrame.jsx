import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Modal, Row, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { useWeatherDataReducer } from "./DataContext";

export default function ChatFrame() {
    const [weatherData, weatherDataDispatch] = useWeatherDataReducer()
    const [chatData, setChatData] = useState()
    const [isGreeting, setIsGreeting] = useState(false)
    const [isChatting, setIsChatting] = useState(false)
    const [isChatToggleable, setIsChatToggleable] = useState(false)

    const GreetingToast = () => {
        const handleClick = () => {
            setIsGreeting(false)
            setIsChatting(true)
        }

        return (
            <ToastContainer className={"position-fixed p-3"} position={"bottom-end"} style={{ cursor: "pointer" }} onClick={handleClick}>
                <Toast show={isGreeting}>
                    <Toast.Header closeButton={false}>
                        <img
                            src={"/logo-chatbot.svg"}
                            width={21}
                            height={21}
                            alt={"chat bot logo"}
                        />
                        <strong className={"me-auto"}>Soma</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>
                        Hello! Do you need some AI assitance? Click here.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        )
    }

    const ChatToggle = () => {
        const handleClick = () => {
            setIsChatToggleable(false)
            setIsChatting(true)
        }

        return (
            <ToastContainer className={"position-fixed p-3"} position={"bottom-end"} style={{ width: "88px", cursor: "pointer" }} onClick={handleClick}>
                <Toast show={isChatToggleable}>
                    <Toast.Header closeButton={false}>
                        <img
                            src={"/logo-chatbot.svg"}
                            width={30}
                            height={30}
                            alt={"chat bot logo"}
                        />
                    </Toast.Header>
                </Toast>
            </ToastContainer>
        )
    }

    const ChatMessageContainer = ({ role, content }) => {
        const assistantStyle = {
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px"
        }
        if (role === "assistant") {
            return (
                <Toast className={"mt-2 mb-2"} style={assistantStyle}>
                    <ToastBody>
                        {content}
                    </ToastBody>
                </Toast>
            )
        }

        const userStyle = {
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px"
        }
        return (
            <Toast className={"mt-2 mb-2 ms-auto"} style={userStyle}>
                <ToastBody>
                    {content}
                </ToastBody>
            </Toast>
        )
    }

    const ChatModal = () => {
        const [chatBoxContent, setChatBoxContent] = useState("")
        const [currentWeatherContext, setCurrentWeatherContext] = useState(weatherData)
        const [currentChatContext, setCurrentChatContext] = useState(chatData)
        const chatBoxEndRef = useRef(null)

        const scrollToBottom = () => {
            chatBoxEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }

        const handleOnSubmit = (event) => {
            event.preventDefault()
            if (!chatBoxContent) {
                return
            }

            const url = `/api/chatbot`
            const data = {
                weather_data: currentWeatherContext,
                chat_data: [...currentChatContext, { role: "user", content: chatBoxContent }]
            }
            axios.post(url, data).then((axiosResponse) => {
                setCurrentChatContext([...axiosResponse.data])
            })

            setCurrentChatContext([...currentChatContext, { role: "user", content: chatBoxContent }])
            setChatBoxContent("")
        }

        const handleOnHide = () => {
            setIsChatting(false)
            setIsChatToggleable(true)
        }

        useEffect(() => {
            scrollToBottom()
        }, [currentChatContext])

        return (
            <Modal show={isChatting} onHide={handleOnHide} backdrop={"static"} keyboard={false} centered>
                <Modal.Header closeButton>
                    <img
                        src={"/logo-chatbot.svg"}
                        width={36}
                        height={36}
                        alt={"chat bot logo"}
                    />
                    <Modal.Title className={"ms-2"}>
                        Soma
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={"p-2 pt-0 pb-0"} style={{ height: "400px", overflow: "scroll" }}>
                    {currentChatContext?.map(({ role, content }) => {
                        return (
                            <ChatMessageContainer role={role} content={content} />
                        )
                    })}
                    <div ref={chatBoxEndRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <form onSubmit={handleOnSubmit}>
                            <Row>
                                <Col className={"p-0"} xs={9}>
                                    <textarea
                                        className={"w-100 h-100"}
                                        placeholder={"Message"}
                                        value={chatBoxContent}
                                        onChange={(event) => { setChatBoxContent(event.target.value) }}
                                    />
                                </Col>
                                <Col className={"p-0 ps-1"} xs={3}>
                                    <Button className={"w-100 h-100"} type={"submit"} variant={"primary"}>Send</Button>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                </Modal.Footer>
            </Modal>
        )
    }

    useEffect(() => {
        if (!weatherData) {
            return
        }

        const url = `/api/chatbot`
        const data = {
            weather_data: weatherData,
            chat_data: []
        }
        axios.post(url, data).then((axiosResponse) => {
            setChatData([...axiosResponse.data])
            setIsChatToggleable(false)
            setIsGreeting(true)
        })
    }, [weatherData])

    return (
        <>
            {chatData ? <GreetingToast /> : ""}
            <ChatToggle />
            <ChatModal />
        </>
    )
}

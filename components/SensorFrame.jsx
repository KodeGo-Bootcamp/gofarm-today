import { useEffect, useState } from "react"
import { Button, Carousel, Container, Image, Modal } from "react-bootstrap"
import Webcam from "react-webcam"
import { computeOppositeSideLength, toCartesianCoordinate, computeConvexHull, computeArea } from "@/core/geometry"

export default function SensorFrame() {
    const [isSensorModalShowing, setIsSensorModalShowing] = useState(false)

    const SensorModal = () => {
        const WebcamFrame = () => {
            const videoConstraints = {
                width: 720,
                height: 720,
                facingMode: { exact: "environment" }
            }

            const horizontalLine = {
                position: "absolute",
                width: "100%",
                height: "1px",
                backgroundColor: "violet",
                top: "50%",
                transformOrigin: "center"
            }

            const verticalLine = {
                position: "absolute",
                width: "1px",
                height: "100%",
                backgroundColor: "violet",
                left: "50%",
                transformOrigin: "center"
            }

            return (
                <div className={"position-relative"}>
                    <div style={horizontalLine}></div>
                    <div style={verticalLine}></div>
                    <Webcam videoConstraints={videoConstraints} style={{ width: "100%", height: "100%" }} />
                </div>
            )
        }

        const SensorOutputFrame = () => {
            const [alpha, setAlpha] = useState()
            const [beta, setBeta] = useState()
            const [gamma, setGamma] = useState()
            const [distance, setDistance] = useState()
            const [coords, setCoords] = useState([])
            const [area, setArea] = useState()

            const handleOnClick = () => {
                const coord = toCartesianCoordinate(distance, alpha)
                setCoords([...coords, coord])
                setArea(computeArea(computeConvexHull([...coords, coord])))
            }

            const checkOrientation = (event) => {
                setAlpha(event.alpha)
                setBeta(event.beta)
                setGamma(event.gamma)
                const oppositeSide = computeOppositeSideLength(event.beta, 1.5641)
                setDistance(oppositeSide)
            }

            useEffect(() => {
                window.addEventListener("deviceorientation", checkOrientation)
            }, [])

            return (
                <div>
                    <Button onClick={handleOnClick}>Capture Corner</Button>
                    <p>Alpha: {alpha}</p>
                    <p>Beta: {beta}</p>
                    <p>Gamma: {gamma}</p>
                    <p>Distance: {distance}m</p>
                    <p>Area: {area ? area + "m^2" : ""}</p>
                </div>
            )
        }

        useEffect(() => {
            try {
                DeviceMotionEvent.requestPermission();
            } catch (e) {
                console.error(e.message)
            }
        }, [])

        return (
            <>
                <Modal show={isSensorModalShowing} fullscreen={true} onHide={() => setIsSensorModalShowing(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <WebcamFrame />
                        <SensorOutputFrame />
                    </Modal.Body>
                </Modal >
            </>
        )
    }

    return (
        <Container>
            <Carousel prevIcon={""} nextIcon={""} indicators={""}>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/cover-gyroscope.png"
                        style={{objectFit: "contain", borderRadius: "0.375rem"}}
                        alt="gyroscope cover image"
                    />
                    <Carousel.Caption style={{color: "black"}}>
                        <h3>Unlocking Precision Agriculture with Your Smartphone's Gyro</h3>
                        <p>Seamlessly Measure Ricefield Areas for Optimal Farming. Embrace the Future of Agriculture, Right in the Palm of Your Hand.</p>
                        <Button onClick={() => setIsSensorModalShowing(true)} variant={"dark"}>Get Started</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <SensorModal />
        </Container>
    )
}

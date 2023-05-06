import { useEffect, useState } from "react"
import { Button, Container, Modal } from "react-bootstrap"
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
            <Button onClick={() => setIsSensorModalShowing(true)}>sensor</Button>
            <SensorModal />
        </Container>
    )
}

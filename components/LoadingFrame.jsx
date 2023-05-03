import { Card } from "react-bootstrap"

export default function LoadingFrame() {
    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    {"Fetching data from the server."}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
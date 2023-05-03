import { Card, Container } from "react-bootstrap"

export default function LoadingFrame() {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Please wait
                    </Card.Title>
                    <Card.Text>
                        Fetching data from the server.
                        If it takes too long, refresh 
                        the page or try again later.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
import { Container, Row, Col, Alert } from "react-bootstrap"

export default function DraftFrame() {
    return (
        <>
            <Container>
                <Row xs={1} md={2} lg={3} xl={4}>
                    {[
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark',
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark',
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark',
                    ].map((variant) => (
                        <Col>
                            <Alert key={variant} variant={variant} style={{height: "50vh"}}>
                                This is a draft frame and should be removed after populating.
                            </Alert>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

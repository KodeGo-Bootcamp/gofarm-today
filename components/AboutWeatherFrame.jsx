import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
export default function AboutWeatherFrame() {
    return (
        <Container padding="5" style={{ backgroundColor: 'aliceblue', padding: '2' }} className="text-center">
        <Row className="my-5">
          <Col md={6}>
          <img
                    src={"/weather-image.png"}
                    width={200}
                    height={200}
                    alt={"chat bot logo"}
                />
         
          </Col>
          <Col md={6}>
            <h2 style={{ fontSize:'60px' }}>Weather API</h2>
            <p style={{ fontSize:'20px' }}>
            The web application must be capable of giving agricultural suggestions based on the examination of weather data obtained from the OpenWeatherMap API.
            </p>
          </Col>
        </Row>
      </Container>
    );
}

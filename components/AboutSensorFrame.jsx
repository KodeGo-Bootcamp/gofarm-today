import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';

export default function AboutMemberFrame() {
   
        return (
            <Container  style={{ backgroundColor: 'aliceblue', padding: '2' }} className="text-center">
            <Row className="my-5">
              <Col md={6}>
              <img
                        src={"/sensor-image.png"}
                        width={200}
                        height={200}
                        alt={"chat bot logo"}
                    />
             
              </Col>
              <Col md={6}>
                <h2 style={{ fontSize:'60px' }}>Sensor</h2>
                <p style={{ fontSize:'20px' }}>
                The web-based application must possess a 
                functionality that enables the calculation of the rice field's dimensions by utilizing the mobile device's camera and gyroscope sensor.
                </p>
              </Col>
            </Row>
          </Container>
        );
}

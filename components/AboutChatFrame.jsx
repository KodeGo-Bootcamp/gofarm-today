import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function AboutChatFrame() {

    return (
        <Container padding="5" style={{ backgroundColor: 'aliceblue', padding: '2px', }} className="text-center">
        <Row className="my-5">
          <Col md={6}>
          <img
                        src={"/logo-chatbot.svg"}
                        width={200}
                        height={200}
                        alt={"chat bot logo"}
                    />
          </Col>
          <Col md={6}>
            <h2 style={{ fontSize:'60px' }}>ChatBot</h2>
            <p style={{ fontSize:'20px' }}>
            Personal assistant: Chatbot can act as virtual assistants, helping users manage their schedules, set reminders, and perform other tasks.
            </p>
           
          </Col>
        </Row>
     
      </Container>
    );

}

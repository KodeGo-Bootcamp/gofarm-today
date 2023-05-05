import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container className="mb-3 mt-5" style={{ backgroundColor: 'aliceblue'}}>
      <Row>
        <Col xs={12} md={6} className="my-3" >
          <h2 className="text-center" style={{ fontSize:'40px' }}>User Needs to Know </h2>
          <p className="text-left" style={{ fontSize:'20px' }}>-The users have basic knowledge of how to operate a mobile phone and access the internet</p>
          <p className="text-left" style={{ fontSize:'20px' }}>-The mobile phone users can utilize a camera and a gyroscope sensor.</p>
        </Col>
        
      </Row>
    </Container>
  );
};

export default AboutUsPage;
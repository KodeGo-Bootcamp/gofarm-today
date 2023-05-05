import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ContactForm() {
 

  return (
    <Container className='text-center mt-5' style={{ backgroundColor: 'aliceblue', padding: '35px', fontSize:'25px' }}>
      <h1 style={{ fontSize:'40px' }}>Contact Us</h1>
    <Form >
    <Form.Group controlId="formName" className="mt-3">
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" placeholder="Enter your name" />
    </Form.Group>

    <Form.Group controlId="formEmail" className="mt-3">
      <Form.Label>Email address:</Form.Label>
      <Form.Control type="email" placeholder="Enter email"/>
    </Form.Group>

    <Form.Group controlId="formMessage" className="mt-3">
      <Form.Label>Message:</Form.Label>
      <Form.Control as="textarea" rows="3" placeholder="Enter your message"  />
    </Form.Group>

    <Button variant="primary" type="submit" className="mt-3">
      SUBMIT
    </Button>
  </Form>
  </Container>
  );
}

export default ContactForm;
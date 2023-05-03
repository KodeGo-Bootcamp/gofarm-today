import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function AboutChatFrame() {
    
        return (
          <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header><h3>What is ChatGPT</h3></Accordion.Header>
        <Accordion.Body>
        ChatGPT is an AI-powered chatbot designed to provide helpful and informative responses to your website visitors. Built on the cutting-edge GPT-3.5 architecture, ChatGPT has been trained on a vast amount of text data and can understand natural language, allowing it to provide intelligent and personalized answers to a wide range of questions.

Whether your website visitors are looking for information on your products or services, need help with a particular issue, or simply want to engage in a conversation, ChatGPT is there to assist them 24/7. With its advanced natural language processing capabilities, ChatGPT can quickly and accurately understand the intent behind each question and provide a response that meets the visitor's needs.

In addition to its impressive capabilities, ChatGPT is also incredibly easy to use. Visitors can interact with ChatGPT through a simple chat interface, and the bot responds in a matter of seconds. Whether you're running a small business or a large enterprise, ChatGPT is an excellent tool to help you engage with your customers and provide them with the support they need.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header><h3>How to use ChatGPT</h3></Accordion.Header>
        <Accordion.Body>
        <h4>Using ChatGPT is easy and straightforward. Here are the steps to follow:</h4>
        <ol>
        <li>Locate the chat interface on your website where ChatGPT is available. This could be a chatbox or a floating icon.</li>
        <li>Type in your question or query in the chat interface. Try to be as clear and specific as possible in your language.</li>
        <li>ChatGPT will process your question using its advanced natural language processing capabilities and provide a response in a matter of seconds.</li>
        <li>Read the response carefully and follow up with additional questions or clarifications if necessary.</li>
        <li>If you have finished your conversation with ChatGPT, simply close the chat interface.</li></ol>
        <p>It's important to note that ChatGPT is an AI-powered chatbot and may not always provide accurate responses to complex or highly technical questions. In such cases, it's always best to consult a human expert or seek further information from credible sources. Nonetheless, ChatGPT is an excellent tool for providing quick and helpful responses to a wide range of queries, and it can be a valuable addition to your website.</p>
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
  );
}
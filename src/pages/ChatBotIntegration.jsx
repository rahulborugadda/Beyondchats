import React, { useState } from 'react';
import Button from '../components/Button';
import Section from '../components/Section';
import Heading from '../components/Heading';
import { Link } from 'react-router-dom';

const ChatbotIntegration = () => {
  const [integrationMessage, setIntegrationMessage] = useState("");

  const handleTestChatbot = () => {
    // Open the client's website in a new tab
    const newWindow = window.open('https://client-website.com', '_blank');

    // Inject a chatbot button into the opened window
    newWindow.onload = () => {
      const chatbotButton = document.createElement("button");
      chatbotButton.innerHTML = "Chat with Us";
      chatbotButton.style.position = "fixed";
      chatbotButton.style.bottom = "20px";
      chatbotButton.style.right = "20px";
      chatbotButton.style.padding = "10px 20px";
      chatbotButton.style.backgroundColor = "#007BFF";
      chatbotButton.style.color = "white";
      chatbotButton.style.borderRadius = "30px";
      chatbotButton.style.border = "none";
      chatbotButton.style.cursor = "pointer";

      // Append the chatbot button to the body of the opened window
      newWindow.document.body.appendChild(chatbotButton);

      // Add functionality to open the chatbot when clicked
      chatbotButton.onclick = () => {
        // Here you can implement the logic to open your chatbot or show a chatbot window
        alert("Chatbot Opened!");
      };
    };
  };

  const handleIntegrateOnWebsite = () => {
    setIntegrationMessage("Integration Successful! Your website is now connected.");
    
    // Optionally hide the message after 5 seconds
    setTimeout(() => setIntegrationMessage(""), 5000);
  };

  const handleMailInstructions = () => {
    // Mail instructions to client's developer
    window.location.href = 'mailto:developer@client.com?subject=Chatbot Integration Instructions&body=Please find the chatbot integration instructions below:...';
  };

  return (
    <Section className="py-10 lg:py-16 xl:py-20">
      <Heading
        title="Chatbot Integration & Testing"
        text="Integrate and test the chatbot on your website."
        className="text-center"
      />

      <div className="flex flex-col items-center space-y-4 -mt-5">
        <Button onClick={handleTestChatbot} px="px-8">
          Test Chatbot
        </Button>

        <div className="text-n-3 text-sm">
          Chatbot not working as intended? 
          <a href="/feedback" className="text-color-1 hover:underline">Share feedback</a>
        </div>

        <div className="flex flex-col space-y-4">
          <Button onClick={handleIntegrateOnWebsite} px="px-8">
            Integrate on Your Website
          </Button>

          <Button onClick={handleMailInstructions} px="px-8">
            Mail Instructions to Developer
          </Button>

          <Link to="/integration-success"><Button>
            Test Integration
          </Button></Link>
        </div>
      </div>

      {/* Integration Message */}
      {integrationMessage && (
        <div className="mt-4 text-center text-green-500">
          {integrationMessage}
        </div>
      )}
    </Section>
  );
};

export default ChatbotIntegration;

import React from 'react';
import Confetti from 'react-confetti';
import Button from '../components/Button';
import Section from '../components/Section';
import Heading from '../components/Heading';

const IntegrationSuccess = () => {
  const handleExploreAdminPanel = () => {
    window.location.href = '/admin-panel';
  };

  const handleStartTalkingToChatbot = () => {
    window.location.href = '/chatbot';
  };

  return (
    <Section className="py-10 lg:py-16 xl:py-20">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <Heading
        title="Integration Successful!"
        text="Your chatbot has been successfully integrated."
        className="text-center"
      />

      <div className="flex flex-col items-center space-y-4">
        <Button onClick={handleExploreAdminPanel} px="px-8">
          Explore Admin Panel
        </Button>

        <Button onClick={handleStartTalkingToChatbot} px="px-8">
          Start Talking to Your Chatbot
        </Button>

        <div className="flex space-x-4">
          <Button onClick={() => window.open('https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20chatbot!', '_blank')} px="px-8">
            Share on Twitter
          </Button>
          <Button onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://your-website.com', '_blank')} px="px-8">
            Share on Facebook
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default IntegrationSuccess;
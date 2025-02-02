import React, { useState } from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import Heading from '../components/Heading';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    // Handle the feedback submission logic here
    console.log("Feedback Submitted:", { name, email, feedback });
    // Clear the fields after submitting
    setName('');
    setEmail('');
    setFeedback('');
  };

  return (
    <Section className="py-10 lg:py-16 xl:py-20">
      <Heading
        title="Share Your Feedback"
        text="We value your input! Let us know how we can improve."
        className="text-center"
      />

      <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
        {/* Name Input */}
        <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Feedback Textarea */}
        <div className="w-full">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback here..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmitFeedback} px="px-8" className="mt-4">
          Submit Feedback
        </Button>
      </div>
    </Section>
  );
};

export default Feedback;

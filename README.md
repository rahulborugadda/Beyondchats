# BeyondChats - Chatbot Integration and Setup

## Overview
BeyondChats is a chatbot company that provides businesses with an easy way to integrate and test chatbots on their websites. This project focuses on implementing a seamless UI/UX for new business chatbot setup, including registration, organization setup, chatbot integration, and testing.

## Project Workflow

### 1. **User Registration**
   - **Objective**: Allow new users to register on the platform.
   - **Fields**:
     - Name
     - Email
     - Password
     - Option to "Continue with Google"
   - **Email Verification**:
     - Upon registration, an email verification code is sent to the user.
     - User needs to input the code to verify their email.

### 2. **Setup Organisation**
   - **Objective**: Collect company details and start the chatbot training.
   - **Fields**:
     - Company Name
     - Website URL
     - Company Description
   - **Bonus Feature**: Auto-fetch the meta-description of the company’s website (using a backend server that scrapes the website).
   - **Webpage Detection**:
     - After submitting the company details, the system scrapes the website in the background to train the chatbot.
     - A UI displays all the webpages detected, showing which pages have been scraped and which are still pending.
     - Users can click on any webpage to view the data chunks scraped from that page.
   - **User Action**:
     - Users can wait for the training to finish or proceed to the next section of setup.

### 3. **Chatbot Integration & Testing**
   - **Objective**: Allow users to integrate the chatbot on their website and test it.
   - **Buttons on this screen**:
     - **Test Chatbot**: Opens the client's website with a dummy chatbot integration at the bottom-right.
     - **Integrate on Your Website**:
       - Display easy-to-follow instructions on how the client can copy-paste a dummy code within the `<head>` section of their website to integrate the chatbot.
       - Option to **Mail Instructions** to the client’s developer.
     - **Test Integration**: Opens a new screen showcasing the integration success.
   - **Integration Success Screen**:
     - Confetti UI or other success animations.
     - After success:
       - "Explore Admin Panel" button.
       - "Start talking to your chatbot" button.
       - Social media sharing buttons.
   - **Integration Failure**:
     - If integration cannot be detected, show an alternative UI indicating failure and offer troubleshooting.

## UI/UX Details

### 1. **User Registration Form**
   - The form contains inputs for `name`, `email`, `password`, and an optional "Continue with Google" button.
   - After registration, users are prompted to verify their email via a verification code.
   - The UI should be clean and simple with clear instructions for email verification.

### 2. **Organisation Setup**
   - Users are prompted to fill in their `company name`, `website URL`, and `company description`.
   - If a URL is provided, the meta-description of the website should be fetched and displayed (this can be done with an API that scrapes the website).
   - Display a progress UI that shows which webpages are scraped and which are pending.
   - Users can click on a webpage to view scraped data chunks.
   - Users can either wait for the scraping to finish or move on to the next section.

### 3. **Chatbot Integration & Testing**
   - This screen includes three main buttons: **Test Chatbot**, **Integrate on Your Website**, and **Test Integration**.
   - When **Test Chatbot** is clicked, the client's website is opened in a new tab with a dummy chatbot button placed at the bottom-right corner.
   - The **Integrate on Your Website** button shows a modal with instructions on how to integrate the chatbot.
   - **Mail Instructions** allows the user to email the instructions to the client's developer.
   - After clicking **Test Integration**, a success screen appears with confetti or success animations.
     - The screen also displays buttons to "Explore Admin Panel", "Start talking to your chatbot", and share on social media.

## Features Implemented
- **Auto-fetch Meta Description**: Fetches the meta description of the company website during setup.
- **Web Scraping Progress**: Displays a dynamic UI showing the status of website scraping (scraped, pending).
- **Chatbot Test Button**: Opens the client website with a dummy chatbot integration at the bottom-right.
- **Email Instructions**: Provides easy-to-follow instructions for integrating the chatbot and the ability to email the instructions to the client’s developer.
- **Integration Success Screen**: Displays a success UI with animated confetti, buttons to "Explore Admin Panel", "Start talking to your chatbot", and social media sharing options.
- **Integration Failure UI**: Displays a failure UI if the chatbot integration is unsuccessful, prompting troubleshooting steps.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS for styling
- **Backend**: Assume a backend server is available for scraping websites and training the chatbot.
- **APIs**:
  - Meta description fetching API
  - Email verification API
  - Chatbot training and scraping API

## Future Enhancements
- **Multi-language Support**: Allow users to select the language of the chatbot.
- **Customizable Chatbot UI**: Allow users to customize the look and feel of their chatbot before integrating.
- **Real-time Chatbot Preview**: Provide a real-time preview of the chatbot’s appearance and behavior on the client website.
- **Advanced Analytics**: Show users insights and analytics about chatbot interactions once it’s integrated on the website.

---

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url.git

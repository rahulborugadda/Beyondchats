import React from "react";
import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn"; // Import SignIn page
import SignUp from "./pages/SignUp";
import Organization from "./pages/Organization";
import ChatbotIntegration from "./pages/ChatBotIntegration";
import IntegrationSuccess from "./pages/IntegrationSuccess";
import Feedback from "./pages/Feedback";

const App = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Benefits />
              <Collaboration />
              <Services />
              <Pricing />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/integration" element={<ChatbotIntegration/>} />
        <Route path="/integration-success" element={<IntegrationSuccess/>} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <ButtonGradient />
    </div>
  );
};

export default App;

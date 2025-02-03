import React, { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate credentials
    if (formData.email && formData.password) {
      console.log("Sign in attempt with:", formData);
      // For demo purposes, we'll just show successful sign-in
      setIsSignedIn(true);
      // Navigate to home after successful sign-in
      window.location.href = "/organization";
    } else {
      setError("Please fill out all fields.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Google Sign-In successful:", codeResponse);
      setIsSignedIn(true);
    },
    onError: () => {
      setError("Google sign-in failed. Please try again.");
    },
  });

  const isFormValid = formData.email && formData.password;

  return (
    <Section className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8">
        <h2 className="text-center text-3xl font-extrabold">Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-5">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/30 bg-white/20 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/30 bg-white/20 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-red-500 text-lg mr-2">⚠</span>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/20"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-5">
            <Link to="/organization"><Button type="submit" disabled={!isFormValid}>
              Sign in
            </Button></Link>
            <Button type="button" onClick={() => login()}>
              Continue with Google
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

const SignInWithGoogle = () => (
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <SignIn />
  </GoogleOAuthProvider>
);

export default SignInWithGoogle;

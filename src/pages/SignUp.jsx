import React, { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [debugCode, setDebugCode] = useState("");

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Check if all fields are filled before proceeding
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isCodeSent) {
      const code = generateVerificationCode();
      console.log("Generated code:", code);
      localStorage.setItem(`verificationCode_${formData.email}`, code);
      setDebugCode(code);
      setIsCodeSent(true);
    } else if (!isVerified) {
      const storedCode = localStorage.getItem(
        `verificationCode_${formData.email}`
      );
      if (verificationCode === storedCode) {
        setIsVerified(true);
        setError("");
        localStorage.removeItem(`verificationCode_${formData.email}`);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Google Sign-In successful:", codeResponse);
      setIsVerified(true);
    },
    onError: () => {
      setError("Google sign-in failed. Please try again.");
    },
  });

  return (
    <Section className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8">
        <h2 className="text-center text-3xl font-extrabold">
          {isVerified ? "Account Created!" : "Sign Up"}
        </h2>

        {isVerified ? (
          <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-green-500 text-lg mr-2">✓</span>
              <p>
                Your email has been verified successfully! You can now log in.
              </p>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm">
              {!isCodeSent && (
                <>
                  <div className="mb-5">
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/30 bg-white/20 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
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
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white/30 bg-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
                </>
              )}

              {isCodeSent && !isVerified && (
                <>
                  <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
                    <p>Verification code has been generated!</p>
                    <p className="font-mono mt-2">Your code: {debugCode}</p>
                  </div>
                  <div>
                    <label htmlFor="verification-code" className="sr-only">
                      Verification Code
                    </label>
                    <input
                      id="verification-code"
                      name="verificationCode"
                      type="text"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-white/30 bg-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                      placeholder="Enter 6-digit verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-lg mr-2">⚠</span>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex justify-center">
                <Button type="submit">
                  {isCodeSent ? "Verify Code" : "Create Account"}
                </Button>
              </div>

              {!isCodeSent && (
                <div className="flex justify-center">
                  <Button type="button" onClick={() => login()}>
                    Continue with Google
                  </Button>
                </div>
              )}
            </div>
          </form>
        )}
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

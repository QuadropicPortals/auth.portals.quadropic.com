"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";

export default function ConfirmLoginPage() {
  const [emailDeclarative, setEmailDeclarative] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code only runs in the browser
    const cookieValue = Cookies.get("tempAuthClient");

    if (cookieValue) {
      try {
        const decoded = decode(cookieValue) as JwtPayload;
        if (decoded && decoded.email) {
          setEmailDeclarative(decoded.email);
        } else {
          setError("Invalid token: email not found");
        }
      } catch (err) {
        setError("Failed to decode token");
      }
    } else {
      setError("No authentication token found");
    }

    setIsLoading(false); // Mark as finished loading
  }, []);

  if (isLoading) {
    // Display a loading state until the component is fully mounted and data is fetched
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-sm p-10 space-y-8">
          <h2 className="text-3xl font-bold text-center text-red-500">Error</h2>
          <p className="text-center text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center">Confirm OTP</h2>
        <div>
          <p className="text-center dark:text-white/30 text-black/30">
            A 6 Digit OTP has been sent to
          </p>
          <p className="text-center">{emailDeclarative}</p>
        </div>
        {/* InputOTP component here */}
        <footer className="text-center">
          <p>Portals Auth by Quadropic</p>
          <p className="text-sm text-black/20 dark:text-white/20">
            Confirm OTP to Register account
          </p>
        </footer>
      </div>
    </div>
  );
}

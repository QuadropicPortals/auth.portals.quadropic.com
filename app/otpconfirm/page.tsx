"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCircleExclamation, FaUnlock } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { registerUserConfirm } from "../math/registerUser";
import { useRouter } from "next/navigation";

export default function ConfirmLoginPage() {
  const [emailDeclarative, setEmailDeclarative] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [globalOtp, setOTP] = useState<string>("");

  const router = useRouter();

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

  const handleOTPChange = (otp: string) => {
    if (otp.length !== 6) {
      setIsDisabled(true);
    } else {
      setOTP(otp);
      setIsDisabled(false);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const res = await registerUserConfirm(globalOtp);
      if (res.status === 200) {
        router.replace("/regsetup");
      }
    } catch (error) {
      setError("Failed to verify OTP");
    }
  };

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
        <InputOTP
          maxLength={6}
          onChange={handleOTPChange}
          onSubmit={handleOTPSubmit}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          type="submit"
          className="w-full rounded-xl p-6 transition-colors"
          disabled={isDisabled}
          onClick={handleOTPSubmit}
        >
          <FaUnlock className="mr-2" />
          Verify OTP
        </Button>
        {error && (
          <Alert variant="destructive">
            <FaCircleExclamation className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error === "Incorrect password. Please try again."
                ? "Incorrect login details."
                : "There's something wrong. Please try again later."}
            </AlertDescription>
          </Alert>
        )}
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

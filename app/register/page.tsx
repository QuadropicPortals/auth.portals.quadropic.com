"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ConfirmLoginPage() {
  const router = useRouter();
  const [emailDeclarative, setEmailDeclarative] = useState<string | null>(null);
  const [idDeclarative, setIdDeclarative] = useState<string | null>(null);
  const [nameDeclarative, setNameDeclarative] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cookieValue = Cookies.get("tempAuthClient");
    if (cookieValue) {
      try {
        const decoded = decode(cookieValue) as JwtPayload;
        setEmailDeclarative(decoded.email || null);
        setIdDeclarative(decoded.id || null);
        setNameDeclarative(decoded.name || null);
      } catch (err) {
        setError("Invalid token");
      }
    } else {
      setError("No token found");
    }
  }, []);

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

        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
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

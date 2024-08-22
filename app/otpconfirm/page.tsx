"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaFingerprint, FaAt, FaCircleExclamation } from "react-icons/fa6";
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
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cookieValue = Cookies.get("tempAuthClient");
  const emailDeclarative = (decode(cookieValue!) as JwtPayload).email;
  const idDeclarative = (decode(cookieValue!) as JwtPayload).id;
  const nameDecalrative = (decode(cookieValue!) as JwtPayload).name;

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

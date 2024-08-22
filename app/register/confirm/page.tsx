"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaFingerprint, FaAt, FaCircleExclamation } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center">Confirm OTP</h2>
        <p className="text-center">
          A 6 Digit OTP has been sent to {searchParams.get("email")}
        </p>
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
            Secured using Passkey by FIDO
          </p>
        </footer>
      </div>
    </div>
  );
}

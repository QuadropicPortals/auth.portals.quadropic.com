"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaFingerprint, FaCircleExclamation } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { registerPasskey } from "../math/registerPasskey";

export default function LoginPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center">Use Passkeys</h2>
        <p className="text-center text-black/60 dark:text-white/60">
          Use Passkeys to Login from Next Time<br></br>More Secure More Reliable
        </p>
        <form className="space-y-6">
          <Button
            className="w-full rounded-xl p-6 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              registerPasskey(setError);
              console.log(error);
            }}
          >
            <FaFingerprint className="mr-2" />
            Get Started with PassKeys
          </Button>
          <Button
            variant={"outline"}
            className="w-full rounded-xl p-6"
            onClick={(e) => {
              e.preventDefault();
              console.log(error);
            }}
          >
            Skip for now
          </Button>
          <p className="text-center text-black/60 dark:text-white/60">
            Works with FaceID, Touch ID, Windows Hello, Android Biometrics and
            Keys.
          </p>
        </form>
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
            Secured using Passkey by FIDO
          </p>
        </footer>
      </div>
    </div>
  );
}

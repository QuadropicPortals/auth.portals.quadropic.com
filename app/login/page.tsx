"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaFingerprint, FaAt, FaCircleExclamation } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { loginPasskey } from "@/app/math/loginPasskey";

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
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Portals Username"
              className="w-full border rounded-xl p-6 pl-12"
              required
            />
            <FaAt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            className="w-full rounded-xl p-6 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              loginPasskey(setError);
              console.log(error);
            }}
          >
            <FaFingerprint className="mr-2" />
            Continue with PassKeys
          </Button>
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

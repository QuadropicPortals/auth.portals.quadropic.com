"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FaPen,
  FaAt,
  FaEnvelope,
  FaA,
  FaCircleExclamation,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { loginPasskey } from "@/app/math/loginPasskey";

export default function LoginPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const registerUser = async (
    username: string,
    displayName: string,
    email: string
  ) => {
    try {
      const response = await fetch("http://localhost:8080/register/start", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          id: username,
          name: displayName,
          email: email,
        }),
      });
      if (!response.ok) {
        setError("There's something wrong. Please try again later.");
        return;
      }
      router.replace("/register/confirm");
      // Handle the response
    } catch (error) {
      setError("There's something wrong. Please try again later.");
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Remove the duplicate declaration of registerUser function

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    registerUser(formData.username, formData.displayName, formData.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center">Register an Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="text"
              name="username"
              placeholder="New Unique Username"
              className="w-full border rounded-xl p-6 pl-12"
              required
              onChange={handleInputChange}
            />
            <FaAt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="text"
              name="displayName"
              placeholder="Display Name"
              className="w-full border rounded-xl p-6 pl-12"
              required
              onChange={handleInputChange}
            />
            <FaA className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <Input
              type="text"
              name="email"
              placeholder="E-Mail Address"
              className="w-full border rounded-xl p-6 pl-12"
              required
              onChange={handleInputChange}
            />
            <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl p-6 transition-colors"
          >
            <FaPen className="mr-2" />
            Continue Creating Account
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
            Register a new account
          </p>
        </footer>
      </div>
    </div>
  );
}

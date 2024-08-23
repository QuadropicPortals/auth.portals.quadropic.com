"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
//import { CalendarDatePicker } from "@/components/ui/datepicker";

import {
  FaBriefcase,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { registerUserStart } from "../math/registerUser";
import DatePicker from "@/components/ui/datepicker";
import { GenderSelect } from "@/components/ui/gender";
import { CountrySelect } from "@/components/ui/countryselect";

export default function Page() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      router.replace("/addPasskey");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center">Almost Done!</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex-row flex items-center space-x-4">
            <p>Birthday</p> <DatePicker />
          </div>
          <div className="flex-row flex items-center space-x-4">
            <p>Gender</p> <GenderSelect />
          </div>
          <div className="relative">
            <Input
              type="text"
              name="role"
              placeholder="Your Job, School, University"
              className="w-full border rounded-xl p-6 pl-12"
              onChange={handleInputChange}
            />
            <FaBriefcase className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex-row flex items-center space-x-4">
            <p>Nationality</p> <CountrySelect />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl p-6 transition-colors"
          >
            <FaCircleCheck className="mr-2" />
            Set it Up
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
            Easy, isn't it?
          </p>
        </footer>
      </div>
    </div>
  );
}

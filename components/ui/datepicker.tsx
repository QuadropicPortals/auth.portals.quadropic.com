"use client";

import { format } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FaCalendar as CalendarIcon } from "react-icons/fa6";

export default function DatePicker({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] justify-start text-left font-normal")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>
            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          onSelect={(selected: Date | undefined) => {
            handleDateChange(selected as Date);
          }}
          autoFocus
          startMonth={new Date(1950, 11)}
          required={false}
          selected={selectedDate}
        />
      </PopoverContent>
    </Popover>
  );
}

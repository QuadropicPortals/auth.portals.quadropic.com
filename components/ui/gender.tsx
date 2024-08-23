import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaMars, FaVenus } from "react-icons/fa6";

export function GenderSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Your Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="male">
            <div className="flex-row flex">
              <FaMars className="mr-2" />
              Male
            </div>
          </SelectItem>
          <SelectItem value="female">
            <div className="flex-row flex">
              <FaVenus className="mr-2" />
              Female
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

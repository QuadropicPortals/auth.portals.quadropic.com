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
import { Input } from "@/components/ui/input";
import { registerLocale } from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import emojiFlags from "emoji-flags";

// Register the English locale for country names
registerLocale(enLocale);

const countries = Object.entries(emojiFlags.data).map(([key, value]) => ({
  name: value.name,
  code: value.code,
  emoji: value.emoji,
}));

export function CountrySelect({
  onChange,
}: {
  onChange: (value: any) => void;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 w-full"
          />
        </div>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {filteredCountries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <span className="mr-2">{country.emoji}</span>
              {country.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

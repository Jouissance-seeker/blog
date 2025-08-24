"use client";

import { Search as SearchIcon } from "lucide-react";
import { Checkbox } from "@/uis/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [queryTitle, setQueryTitle] = useState(searchParams.get("title") ?? "");
  const [queryAuthor, setQueryAuthor] = useState(
    searchParams.get("author") ?? ""
  );
  const [queryType, setQueryType] = useState(searchParams.get("type") ?? "");
  const updateURL = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newURL);
    },
    [searchParams, pathname, router]
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL({
        title: queryTitle,
        author: queryAuthor,
        type: queryType,
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [queryTitle, queryAuthor, queryType, updateURL]);

  return (
    <aside>
      <div className="sticky top-25.5 flex flex-col gap-4 bg-card">
        <Title value={queryTitle} onChange={setQueryTitle} />
        <Author value={queryAuthor} onChange={setQueryAuthor} />
        <Type value={queryType} onChange={setQueryType} />
      </div>
    </aside>
  );
};

const Title = ({ value, onChange }: FilterProps) => (
  <div className="flex h-fit gap-1 bg-card focus-within:border-primary transition-all border p-2.5 rounded-lg">
    <SearchIcon className="size-5 text-muted-foreground" />
    <input
      className="text-sm placeholder:text-muted-foreground text-muted-foreground focus:outline-none flex-1 bg-transparent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="عنوان را وارد کنید ..."
    />
  </div>
);

const Author = ({ value, onChange }: FilterProps) => {
  const authors = ["لکان", "یونگ"];

  const isValueSelected = useCallback(
    (authorValue: string) => {
      if (!value) return false;
      const values = value.split(",").map((v) => v.trim());
      return values.includes(authorValue);
    },
    [value]
  );

  const handleCheckbox = useCallback(
    (authorValue: string, checked: boolean) => {
      const currentValues = value
        ? value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

      if (checked && !currentValues.includes(authorValue)) {
        onChange([...currentValues, authorValue].join(","));
      } else if (!checked) {
        const newValues = currentValues.filter((v) => v !== authorValue);
        onChange(newValues.length > 0 ? newValues.join(",") : "");
      }
    },
    [value, onChange]
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-smp font-medium">شخصیت</span>
      </div>
      <div className="flex h-fit gap-1 p-2.5">
        <ul className="flex flex-col gap-1">
          {authors.map((author) => (
            <li key={author} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckbox(author, checked as boolean)
                }
                checked={isValueSelected(author)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(author);
                  handleCheckbox(author, !isCurrentlyChecked);
                }}
              >
                {author}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Type = ({ value, onChange }: FilterProps) => {
  const types = ["مفاهیم", "جستار"];

  const isValueSelected = useCallback(
    (typeValue: string) => {
      if (!value) return false;
      const values = value.split(",").map((v) => v.trim());
      return values.includes(typeValue);
    },
    [value]
  );

  const handleCheckbox = useCallback(
    (typeValue: string, checked: boolean) => {
      const currentValues = value
        ? value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

      if (checked && !currentValues.includes(typeValue)) {
        onChange([...currentValues, typeValue].join(","));
      } else if (!checked) {
        const newValues = currentValues.filter((v) => v !== typeValue);
        onChange(newValues.length > 0 ? newValues.join(",") : "");
      }
    },
    [value, onChange]
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-smp font-medium">نوع</span>
      </div>
      <div className="flex h-fit gap-1 p-2.5">
        <ul className="flex flex-col gap-1">
          {types.map((type) => (
            <li key={type} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckbox(type, checked as boolean)
                }
                checked={isValueSelected(type)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(type);
                  handleCheckbox(type, !isCurrentlyChecked);
                }}
              >
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

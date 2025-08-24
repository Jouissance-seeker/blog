"use client";

import { useQueryState } from "nuqs";
import { Search as SearchIcon } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { Checkbox } from "@/uis/checkbox";

export const Filters = () => {
  return (
    <div className="flex flex-col gap-4">
      <Search />
      <Author />
      <Type />
    </div>
  );
};

const Search = () => {
  const [queryQ, setQueryQ] = useQueryState("q", {
    defaultValue: "",
  });

  return (
    <AnimatedSection>
      <div className="flex h-fit gap-1 bg-background focus-within:border-primary transition-all border p-2.5 rounded-lg">
        <SearchIcon className="size-5 text-muted-foreground" />
        <input
          className="text-smp focus:outline-none"
          value={queryQ}
          onChange={(e) => setQueryQ(e.target.value)}
          placeholder="عنوان را وارد کنید ..."
        />
      </div>
    </AnimatedSection>
  );
};

const Author = () => {
  const [queryAuthor, setQueryAuthor] = useQueryState("author", {
    defaultValue: "",
  });

  const authors = [
    'لکان'
  ];

  const handleCheckbox = (authorValue: string, checked: boolean) => {
    if (checked) {
      const newValue = queryAuthor
        ? `${queryAuthor},${authorValue}`
        : authorValue;
      setQueryAuthor(newValue);
    } else {
      const newValue = queryAuthor
        .replace(authorValue, "")
        .replace(/^,+|,+$/g, "")
        .replace(/,+/g, ",");
      setQueryAuthor(newValue);
    }
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col border rounded-lg bg-background">
        <div className="p-2 border-b">
          <span className="text-smp text-muted-foreground">شخصیت</span>
        </div>
        <div className="flex h-fit gap-1 p-2.5">
          <ul className="flex flex-col gap-1">
            {authors.map((author) => (
              <li key={author} className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(checked) =>
                    handleCheckbox(author, checked as boolean)
                  }
                  checked={queryAuthor.includes(author)}
                />
                <label
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                  onClick={() => {
                    const isCurrentlyChecked = queryAuthor.includes(
                      author
                    );
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
    </AnimatedSection>
  );
};

const Type = () => {
  const [queryType, setQueryType] = useQueryState("type", {
    defaultValue: "",
  });

  const types = [
    'مفهموم',
    'جستار'
  ];

  const handleCheckbox = (typeValue: string, checked: boolean) => {
    if (checked) {
      const newValue = queryType
        ? `${queryType},${typeValue}`
        : typeValue;
      setQueryType(newValue);
    } else {
      const newValue = queryType
        .replace(typeValue, "")
        .replace(/^,+|,+$/g, "")
        .replace(/,+/g, ",");
      setQueryType(newValue);
    }
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col border rounded-lg bg-background">
        <div className="p-2 border-b">
          <span className="text-smp text-muted-foreground">شخصیت</span>
        </div>
        <div className="flex h-fit gap-1 p-2.5">
          <ul className="flex flex-col gap-1">
            {types.map((type) => (
              <li key={type} className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(checked) =>
                    handleCheckbox(type, checked as boolean)
                  }
                  checked={queryType.includes(type)}
                />
                <label
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                  onClick={() => {
                    const isCurrentlyChecked = queryType.includes(
                      type
                    );
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
    </AnimatedSection>
  );
};

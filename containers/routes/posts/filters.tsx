"use client";

import { useQueryState } from "nuqs";
import { Search as SearchIcon } from "lucide-react";
import { Checkbox } from "@/uis/checkbox";

export const Filters = () => {
  return (
    <aside>
      <div className="sticky top-25.5 flex flex-col gap-4 bg-card">
        <Search />
        <Author />
        <Type />
      </div>
    </aside>
  );
};

const Search = () => {
  const [querySearch, setQuerySearch] = useQueryState("q", {
    defaultValue: "",
  });

  return (
    <div className="flex h-fit gap-1 bg-card focus-within:border-primary transition-all border p-2.5 rounded-lg">
      <SearchIcon className="size-5 text-muted-foreground" />
      <input
        className="text-sm placeholder:text-muted-foreground text-muted-foreground focus:outline-none flex-1 bg-transparent"
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
        placeholder="عنوان را وارد کنید ..."
      />
    </div>
  );
};

const Author = () => {
  const [queryAuthor, setQueryAuthor] = useQueryState("author", {
    defaultValue: "",
  });

  const authors = ["لکان"];

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
                checked={queryAuthor.includes(author)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = queryAuthor.includes(author);
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

const Type = () => {
  const [queryType, setQueryType] = useQueryState("type", {
    defaultValue: "",
  });

  const types = ["مفهوم", "جستار"];

  const handleCheckbox = (typeValue: string, checked: boolean) => {
    if (checked) {
      const newValue = queryType ? `${queryType},${typeValue}` : typeValue;
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
                checked={queryType.includes(type)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = queryType.includes(type);
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

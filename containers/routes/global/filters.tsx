"use client";

import { useQueryState } from "nuqs";
import { Search as SearchIcon } from "lucide-react";
import { Checkbox } from "@/uis/checkbox";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Filters = () => {
  const [queryTitle] = useQueryState("title", { defaultValue: "" });
  const [queryAuthor] = useQueryState("author", { defaultValue: "" });
  const [queryType] = useQueryState("type", { defaultValue: "" });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      if (queryTitle) params.set("title", queryTitle);
      if (queryAuthor) params.set("author", queryAuthor);
      if (queryType) params.set("type", queryType);

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [queryTitle, queryAuthor, queryType, router]);

  return (
    <aside>
      <div className="sticky top-25.5 flex flex-col gap-4 bg-card">
        <Title />
        <Author />
        <Type />
      </div>
    </aside>
  );
};

const Title = () => {
  const [queryTitle, setQueryTitle] = useQueryState("title", {
    defaultValue: "",
  });

  return (
    <div className="flex h-fit gap-1 bg-card focus-within:border-primary transition-all border p-2.5 rounded-lg">
      <SearchIcon className="size-5 text-muted-foreground" />
      <input
        className="text-sm placeholder:text-muted-foreground text-muted-foreground focus:outline-none flex-1 bg-transparent"
        value={queryTitle}
        onChange={(e) => setQueryTitle(e.target.value)}
        placeholder="عنوان را وارد کنید ..."
      />
    </div>
  );
};

const Author = () => {
  const [queryAuthor, setQueryAuthor] = useQueryState("author", {
    defaultValue: "",
  });
  const authors = ["لکان", "یونگ"];

  const isValueSelected = (value: string, queryString: string): boolean => {
    if (!queryString) return false;
    const values = queryString.split(",").map((v) => v.trim());
    return values.includes(value);
  };

  const handleCheckbox = (authorValue: string, checked: boolean) => {
    const currentValues = queryAuthor
      ? queryAuthor
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v)
      : [];

    if (checked && !currentValues.includes(authorValue)) {
      setQueryAuthor([...currentValues, authorValue].join(","));
    } else if (!checked) {
      const newValues = currentValues.filter((v) => v !== authorValue);
      setQueryAuthor(newValues.length > 0 ? newValues.join(",") : "");
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
                checked={isValueSelected(author, queryAuthor)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(
                    author,
                    queryAuthor
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
  );
};

const Type = () => {
  const [queryType, setQueryType] = useQueryState("type", { defaultValue: "" });
  const types = ["مفاهیم", "جستار"];

  const isValueSelected = (value: string, queryString: string): boolean => {
    if (!queryString) return false;
    const values = queryString.split(",").map((v) => v.trim());
    return values.includes(value);
  };

  const handleCheckbox = (typeValue: string, checked: boolean) => {
    const currentValues = queryType
      ? queryType
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v)
      : [];

    if (checked && !currentValues.includes(typeValue)) {
      setQueryType([...currentValues, typeValue].join(","));
    } else if (!checked) {
      const newValues = currentValues.filter((v) => v !== typeValue);
      setQueryType(newValues.length > 0 ? newValues.join(",") : "");
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
                checked={isValueSelected(type, queryType)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(type, queryType);
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

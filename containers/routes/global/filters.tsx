'use client';

import { Search as SearchIcon } from 'lucide-react';
import { Checkbox } from '@/uis/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { category } from '@/constants/category';

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [queryTitle, setQueryTitle] = useState(searchParams.get('title') ?? '');
  const [queryAuthors, setQueryAuthors] = useState(
    searchParams.get('authors') ?? '',
  );
  const [queryCategory, setQueryCategory] = useState(
    searchParams.get('category') ?? '',
  );
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
    [searchParams, pathname, router],
  );
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL({
        title: queryTitle,
        authors: queryAuthors,
        category: queryCategory,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [queryTitle, queryAuthors, queryCategory, updateURL]);

  return (
    <aside>
      <div className="sticky top-25.5 flex flex-col gap-4 bg-card">
        <Title value={queryTitle} onChange={setQueryTitle} />
        <Author value={queryAuthors} onChange={setQueryAuthors} />
        <Category value={queryCategory} onChange={setQueryCategory} />
      </div>
    </aside>
  );
};

const Title = ({ value, onChange }: FilterProps) => (
  <div className="flex h-fit gap-1 bg-card focus-within:border-primary border p-2.5 rounded-lg">
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
  const authors = ['لکان', 'یونگ', 'کانت'];

  const isValueSelected = useCallback(
    (authorValue: string) => {
      if (!value) return false;
      const values = value.split(',').map((v) => v.trim());
      return values.includes(authorValue);
    },
    [value],
  );

  const handleCheckbox = useCallback(
    (authorValue: string, checked: boolean) => {
      const currentValues = value
        ? value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

      if (checked && !currentValues.includes(authorValue)) {
        onChange([...currentValues, authorValue].join(','));
      } else if (!checked) {
        const newValues = currentValues.filter((v) => v !== authorValue);
        onChange(newValues.length > 0 ? newValues.join(',') : '');
      }
    },
    [value, onChange],
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-smp font-medium">اندیشمندان</span>
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

const Category = ({ value, onChange }: FilterProps) => {
  const isValueSelected = useCallback(
    (categoryValue: string) => {
      if (!value) return false;
      const values = value.split(',').map((v) => v.trim());
      return values.includes(categoryValue);
    },
    [value],
  );

  const handleCheckbox = useCallback(
    (categoryValue: string, checked: boolean) => {
      const currentValues = value
        ? value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

      if (checked && !currentValues.includes(categoryValue)) {
        onChange([...currentValues, categoryValue].join(','));
      } else if (!checked) {
        const newValues = currentValues.filter((v) => v !== categoryValue);
        onChange(newValues.length > 0 ? newValues.join(',') : '');
      }
    },
    [value, onChange],
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-smp font-medium">دسته بندی</span>
      </div>
      <div className="flex h-fit gap-1 p-2.5">
        <ul className="flex flex-col gap-1">
          {category.map((category) => (
            <li key={category.fa} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckbox(category.fa, checked as boolean)
                }
                checked={isValueSelected(category.fa)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(category.fa);
                  handleCheckbox(category.fa, !isCurrentlyChecked);
                }}
              >
                {category.fa}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

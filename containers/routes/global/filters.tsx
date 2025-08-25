'use client';

import { Search as SearchIcon } from 'lucide-react';
import { Checkbox } from '@/uis/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { category } from '@/constants/category';
import { authors } from '@/constants/authors';

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

const getParam = (sp: URLSearchParams, key: string) => sp.get(key) ?? '';

export const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [queryTitle, setQueryTitle] = useState(getParam(searchParams, 'title'));
  const [queryAuthors, setQueryAuthors] = useState(
    getParam(searchParams, 'authors'),
  );
  const [queryCategory, setQueryCategory] = useState(
    getParam(searchParams, 'category'),
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildNextURL = useCallback(
    (current: URLSearchParams, updates: Record<string, string>) => {
      const params = new URLSearchParams(current);
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value.trim()) params.set(key, value.trim());
        else params.delete(key);
      });
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname],
  );

  useEffect(() => {
    const title = getParam(searchParams, 'title');
    const authorsParam = getParam(searchParams, 'authors');
    const categoryParam = getParam(searchParams, 'category');

    setQueryTitle(title);
    setQueryAuthors(authorsParam);
    setQueryCategory(categoryParam);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }, [searchParams]);

  useEffect(() => {
    const current = new URLSearchParams(searchParams);
    const sameAsURL =
      getParam(current, 'title') === queryTitle &&
      getParam(current, 'authors') === queryAuthors &&
      getParam(current, 'category') === queryCategory;

    if (sameAsURL) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const nextURL = buildNextURL(current, {
        title: queryTitle,
        authors: queryAuthors,
        category: queryCategory,
      });

      const currentURL = current.toString().length
        ? `${pathname}?${current.toString()}`
        : pathname;

      if (nextURL !== currentURL) {
        router.replace(nextURL);
      }
      debounceRef.current = null;
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [
    queryTitle,
    queryAuthors,
    queryCategory,
    searchParams,
    buildNextURL,
    pathname,
    router,
  ]);

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
  const isValueSelected = useCallback(
    (authorValue: string) => {
      if (!value) return false;
      const values = value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
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
        const next = currentValues.filter((v) => v !== authorValue);
        onChange(next.length ? next.join(',') : '');
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
            <li key={author.en} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckbox(author.en, checked as boolean)
                }
                checked={isValueSelected(author.en)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(author.en);
                  handleCheckbox(author.en, !isCurrentlyChecked);
                }}
              >
                {author.fa}
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
      const values = value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
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
        const next = currentValues.filter((v) => v !== categoryValue);
        onChange(next.length ? next.join(',') : '');
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
            <li key={category.en} className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckbox(category.en, checked as boolean)
                }
                checked={isValueSelected(category.en)}
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                onClick={() => {
                  const isCurrentlyChecked = isValueSelected(category.en);
                  handleCheckbox(category.en, !isCurrentlyChecked);
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

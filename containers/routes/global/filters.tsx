'use client';

import { Checkbox } from '@/uis/checkbox';
import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { category } from '@/constants/category';
import { authors } from '@/constants/authors';

export const Filters = () => {
  const [authorsState, setAuthorsState] = useQueryState('authors', {
    defaultValue: '',
  });
  const [categoryState, setCategoryState] = useQueryState('category', {
    defaultValue: '',
  });
  const handleAuthorsChange = useCallback((value: string) => {
    setAuthorsState(value);
  }, []);
  const handleCategoryChange = useCallback((value: string) => {
    setCategoryState(value);
  }, []);

  return (
    <aside>
      <div className="sticky top-25 flex flex-col gap-4">
        <AuthorFilter value={authorsState} onChange={handleAuthorsChange} />
        <CategoryFilter value={categoryState} onChange={handleCategoryChange} />
      </div>
    </aside>
  );
};

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

const AuthorFilter = ({ value, onChange }: FilterProps) => {
  const selectedAuthors = useMemo(() => {
    if (!value) return [];
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }, [value]);

  const isChecked = useCallback(
    (authorValue: string) => {
      return selectedAuthors.includes(authorValue);
    },
    [selectedAuthors],
  );

  const handleChange = useCallback(
    (authorValue: string, checked: boolean) => {
      let newAuthors: string[];

      if (checked) {
        if (!selectedAuthors.includes(authorValue)) {
          newAuthors = [...selectedAuthors, authorValue];
        } else {
          return;
        }
      } else {
        newAuthors = selectedAuthors.filter((v) => v !== authorValue);
      }

      onChange(newAuthors.join(','));
    },
    [selectedAuthors, onChange],
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-sm font-medium">اندیشمندان</span>
      </div>
      <div className="flex h-fit gap-1 p-2.5">
        <ul className="flex flex-col gap-1">
          {authors.map((author) => (
            <li key={author.en} className="flex items-center gap-2">
              <Checkbox
                id={`author-${author.en}`}
                checked={isChecked(author.en)}
                onCheckedChange={(checked) =>
                  handleChange(author.en, checked === true)
                }
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                htmlFor={`author-${author.en}`}
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

const CategoryFilter = ({ value, onChange }: FilterProps) => {
  const selectedCategories = useMemo(() => {
    if (!value) return [];
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }, [value]);

  const isChecked = useCallback(
    (categoryValue: string) => {
      return selectedCategories.includes(categoryValue);
    },
    [selectedCategories],
  );

  const handleChange = useCallback(
    (categoryValue: string, checked: boolean) => {
      let newCategories: string[];

      if (checked) {
        if (!selectedCategories.includes(categoryValue)) {
          newCategories = [...selectedCategories, categoryValue];
        } else {
          return;
        }
      } else {
        newCategories = selectedCategories.filter((v) => v !== categoryValue);
      }

      onChange(newCategories.join(','));
    },
    [selectedCategories, onChange],
  );

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-sm font-medium">دسته بندی</span>
      </div>
      <div className="flex h-fit gap-1 p-2.5">
        <ul className="flex flex-col gap-1">
          {category.map((cat) => (
            <li key={cat.en} className="flex items-center gap-2">
              <Checkbox
                id={`category-${cat.en}`}
                checked={isChecked(cat.en)}
                onCheckedChange={(checked) =>
                  handleChange(cat.en, checked === true)
                }
              />
              <label
                className="text-sm text-muted-foreground cursor-pointer select-none"
                htmlFor={`category-${cat.en}`}
              >
                {cat.fa}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

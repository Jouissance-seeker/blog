'use client';

import { Search as SearchIcon } from 'lucide-react';
import { Checkbox } from '@/uis/checkbox';
import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { category } from '@/constants/category';
import { authors } from '@/constants/authors';

export const Filters = () => {
  const [titleState, setTitleState] = useQueryState('title', {
    defaultValue: '',
  });
  const [authorsState, setAuthorsState] = useQueryState('authors', {
    defaultValue: '',
  });
  const [categoryState, setCategoryState] = useQueryState('category', {
    defaultValue: '',
  });
  const handleTitleChange = (value: string) => {
    setTitleState(value);
  };
  const handleAuthorsChange = useCallback((value: string) => {
    setAuthorsState(value);
  }, []);
  const handleCategoryChange = useCallback((value: string) => {
    setCategoryState(value);
  }, []);

  return (
    <aside>
      <div className="sticky top-25 flex flex-col gap-4">
        <TitleFilter value={titleState} onChange={handleTitleChange} />
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

const TitleFilter = ({ value, onChange }: FilterProps) => (
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

'use client';

import { Search as SearchIcon } from 'lucide-react';
import { Checkbox } from '@/uis/checkbox';
import { useQueryState } from 'nuqs';
import { category } from '@/constants/category';
import { authors } from '@/constants/authors';

export const Filters = () => {
  const [title, setTitle] = useQueryState('title', {
    defaultValue: '',
    throttleMs: 300,
  });

  const [authorsValue, setAuthorsValue] = useQueryState('authors', {
    defaultValue: '',
  });

  const [categoryValue, setCategoryValue] = useQueryState('category', {
    defaultValue: '',
  });

  return (
    <aside>
      <div className="sticky top-24 flex flex-col gap-4 bg-card">
        <Title value={title} onChange={setTitle} />
        <Author value={authorsValue} onChange={setAuthorsValue} />
        <Category value={categoryValue} onChange={setCategoryValue} />
      </div>
    </aside>
  );
};

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

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
  const isChecked = (authorValue: string) => {
    if (!value) return false;
    return value
      .split(',')
      .map((v) => v.trim())
      .includes(authorValue);
  };

  const handleChange = (authorValue: string, checked: boolean) => {
    const current = value
      ? value
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

    if (checked) {
      if (!current.includes(authorValue)) {
        onChange([...current, authorValue].join(','));
      }
    } else {
      const next = current.filter((v) => v !== authorValue);
      onChange(next.join(','));
    }
  };

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

const Category = ({ value, onChange }: FilterProps) => {
  const isChecked = (categoryValue: string) => {
    if (!value) return false;
    return value
      .split(',')
      .map((v) => v.trim())
      .includes(categoryValue);
  };

  const handleChange = (categoryValue: string, checked: boolean) => {
    const current = value
      ? value
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

    if (checked) {
      if (!current.includes(categoryValue)) {
        onChange([...current, categoryValue].join(','));
      }
    } else {
      const next = current.filter((v) => v !== categoryValue);
      onChange(next.join(','));
    }
  };

  return (
    <div className="flex flex-col border rounded-lg bg-card">
      <div className="p-2 border-b">
        <span className="text-smp font-medium">دسته بندی</span>
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

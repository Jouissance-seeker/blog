'use client';

import { Checkbox } from '@/uis/checkbox';
import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { authors } from '@/constants/authors';

export const Filters = () => {
  const [authorsState, setAuthorsState] = useQueryState('authors', {
    defaultValue: '',
  });
  const handleAuthorsChange = useCallback((value: string) => {
    setAuthorsState(value);
  }, []);

  return (
    <aside>
      <div className="sticky top-25 flex flex-col gap-4">
        <AuthorFilter value={authorsState} onChange={handleAuthorsChange} />
      </div>
    </aside>
  );
};

interface AuthorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const AuthorFilter = ({ value, onChange }: AuthorFilterProps) => {
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

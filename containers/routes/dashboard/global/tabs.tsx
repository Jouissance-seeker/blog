import { Button } from '@/uis/button';
import { usePathname, useRouter } from 'next/navigation';

export const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const filterOptions = [
    { key: '/dashboard/concepts', label: 'مفاهیم' },
    { key: '/dashboard/essays', label: 'جستار' },
  ];
  const handleTab = (tab: string) => {
    router.push(tab);
  };

  return (
    <div className="justify-center gap-1.5 p-1.5 rounded-lg bg-background text-foreground border w-fit hidden sm:flex">
      {filterOptions.map((option) => (
        <Button
          key={option.key}
          className="transition-colors h-9 px-4"
          variant={pathname === option.key ? 'default' : 'ghost'}
          onClick={() => handleTab(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

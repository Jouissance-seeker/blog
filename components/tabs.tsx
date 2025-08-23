import { Button } from "@/uis/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const filterOptions = [
    { key: "concept", label: "مفاهیم" },
    { key: "all", label: "همه" },
    { key: "essay", label: "جستارها" },
  ];
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab") ?? "all";
  const handleTab = (tab: string) => {
    router.push(`${pathname}?tab=${tab}`);
  };

  if (pathname !== "/" && pathname !== "/dashboard") return;

  return (
    <div className="justify-center gap-2 p-2 rounded-lg bg-background text-foreground border w-fit hidden sm:flex">
      {filterOptions.map((option) => (
        <Button
          key={option.key}
          className="transition-colors h-8 px-3"
          variant={queryTab === option.key ? "default" : "ghost"}
          onClick={() => handleTab(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

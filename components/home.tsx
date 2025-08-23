import { Button } from "@/uis/button";
import { usePathname } from "next/navigation";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export const Home = () => {
  const pathname = usePathname();

  return (
    pathname !== "/" && (
      <Link href="/">
        <Button className="size-11" size="icon">
          <HomeIcon className="size-6" />
        </Button>
      </Link>
    )
  );
};

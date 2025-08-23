import { Post } from "@/types/post";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/uis/button";
import { SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/uis/command";

interface SearchProps {
  postsData: Post[];
}

export const Search = (props: SearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSelect = (post: Post) => {
    setOpen(false);
    router.push(`/${post.slug}`);
  };

  const filterPosts = (posts: Post[], searchTerm: string) => {
    if (!searchTerm.trim()) return posts;
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredEssays = filterPosts(
    props.postsData.filter((post) => post.type === "essay"),
    searchValue
  );
  const filteredConcepts = filterPosts(
    props.postsData.filter((post) => post.type === "concept"),
    searchValue
  );

  return (
    <>
      <Button size="icon" className="size-11" onClick={() => setOpen(true)}>
        <SearchIcon className="size-6" />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) setSearchValue("");
        }}
        title="جستجو"
        description="به دنبال مقاله یا مفهومی می گردید؟"
        shouldFilter={false}
      >
        <CommandInput
          placeholder="جستجو در جستارها و مفاهیم..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          <CommandEmpty>هیچ نتیجه ای یافت نشد.</CommandEmpty>
          {filteredConcepts.length > 0 && (
            <CommandGroup heading="مفاهیم">
              {filteredConcepts.map((concept) => (
                <CommandItem
                  key={concept._id?.toString()}
                  value={concept.title}
                  onSelect={() => handleSelect(concept)}
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium">{concept.title}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {concept.summary}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {filteredEssays.length > 0 && (
            <CommandGroup heading="جستارها">
              {filteredEssays.map((essay) => (
                <CommandItem
                  key={essay._id?.toString()}
                  value={essay.title}
                  onSelect={() => handleSelect(essay)}
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium">{essay.title}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {essay.summary}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

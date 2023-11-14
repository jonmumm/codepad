"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { ShareIcon } from "lucide-react";
import { useCallback, useState } from "react";

export const Share = ({ host, id }: { id: string; host: string }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handlePressCopy = useCallback(() => {
    setShowCopied(true);
    navigator.clipboard.writeText(`https://${host}/thread/${id}`);

    setTimeout(() => {
      setShowCopied(false);
    }, 3000);
  }, [setShowCopied]);

  const CopyButton = () => (
    <Button size="lg" variant="outline">
      Copy
      <ClipboardCopyIcon />
    </Button>
  );

  return (
    <div className="flex flex-row gap-2 items-center p-2 justify-end">
      <ShareIcon />
      <code className="border rounded-md px-3 py-2">
        https://{host}/thread/{id}
      </code>

      <Popover open={showCopied} onOpenChange={handlePressCopy}>
        <PopoverTrigger disabled={showCopied}>
          <CopyButton />
        </PopoverTrigger>
        <PopoverContent className="w-fit">Copied!</PopoverContent>
      </Popover>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { ShareIcon } from "lucide-react";

export const Share = ({ host, id }: { id: string; host: string }) => {
  return (
    <div className="flex flex-row gap-1 items-center py-2 items-center justify-center">
      <ShareIcon />
      <code className="border rounded-md px-3 py-2">
        http://{host}/thread/{id}
      </code>
      <Button>
        Copy
        <ClipboardCopyIcon />
      </Button>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { useDeleteCollection } from "../queries";

export function DeleteCollection() {
  const { mutate, isPending } = useDeleteCollection();
  return (
    <Button onClick={() => mutate()} disabled={isPending} variant="destructive">
      Delete Collection
    </Button>
  );
}

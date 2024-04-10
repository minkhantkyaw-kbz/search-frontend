import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { AddForm } from "./add-form";
import { useState } from "react";
import { FileForm } from "./file-form";

export function AddFormModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Docs</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add new document</DialogTitle>
        </DialogHeader>
        <FileForm setOpen={setOpen} />
        {/* <AddForm setOpen={setOpen} /> */}
      </DialogContent>
    </Dialog>
  );
}

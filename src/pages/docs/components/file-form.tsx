import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadAndAddDocs } from "../queries";
import { LoadingButton } from "@/components/ui/loading-button";

const formSchema = z.object({
  file: z.instanceof(FileList),
});

export function FileForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  const { mutateAsync, isPending } = useUploadAndAddDocs();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    const promise = mutateAsync(formData);
    toast.promise(promise, {
      loading: "Adding document to the vector",
      success: () => {
        setOpen(false);
        return "Document has been added to the vector";
      },
      error: "Error",
    });
  };

  return (
    <Form {...form}>
      <form
        id="fileForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="file"
          render={() => {
            return (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="upload file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <LoadingButton type="submit" form="fileForm" loading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}

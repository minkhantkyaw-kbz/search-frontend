import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { useAddDocs } from "../queries";
import { LoadingButton } from "@/components/ui/loading-button";
import { FormInput } from "./inputs";

const formSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(2),
});

type formSchemaType = z.infer<typeof formSchema>;

export function AddForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const { mutateAsync, isPending } = useAddDocs();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit", values);
    const promise = mutateAsync(values);
    toast.promise(promise, {
      loading: "Adding document to the vector",
      success: () => {
        setOpen(false);
        return "Document has been added to the vector";
      },
      error: "Error",
    });
  }

  return (
    <Form {...form}>
      <form
        id="addForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInput<UseFormReturn<formSchemaType>>
          form={form}
          label="Title"
          placeholder="Enter Title"
          type="text"
          name="title"
        />
        <FormInput<UseFormReturn<formSchemaType>>
          form={form}
          label="Title"
          placeholder="Enter Title"
          type="text"
          name="text"
        />
        <LoadingButton type="submit" form="addForm" loading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}

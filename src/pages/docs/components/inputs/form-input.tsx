import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";

interface FormInputProps<TForm extends FieldValues> {
  form: TForm;
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

export function FormInput<TForm extends FieldValues>({
  form,
  label,
  type,
  placeholder,
  name,
}: FormInputProps<TForm>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

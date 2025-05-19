import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useAppForm } from "../hooks/use-app-form";

import type { AnyRoute } from "@tanstack/react-router";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

function SimpleForm() {
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // Show success message
      alert("Form submitted successfully!");
    },
  });

  return (
    <div
      className="flex items-center w-full justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 50% at 5% 40%, #add8e6 0%, #0000ff 70%, #00008b 100%)",
      }}
    >
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.AppField name="title">
            {(field) => <field.TextField label="Title" />}
          </form.AppField>

          <form.AppField name="description">
            {(field) => <field.TextArea label="Description" />}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SimpleFormRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/demo/form/simple",
    component: SimpleForm,
  });
}

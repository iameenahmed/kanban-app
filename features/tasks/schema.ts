import z from "zod";

export const TaskFormSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  subtasks: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(3, "Name must be at least 3 characters long"),
      isCompleted: z.boolean().optional(),
    }),
  ),
  columnId: z.string().optional(),
});

export type TaskFormSchemaTypes = z.infer<typeof TaskFormSchema>;

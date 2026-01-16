import z from "zod";

export const BoardFormSchema = z.object({
  board_name: z.string().min(3, "Name must be at least 3 characters long"),
  columns: z.array(
    z.object({
      id: z.string().optional(),
      title: z.string().min(3, "Name must be at least 3 characters long"),
    }),
  ),
});

export type BoardFormSchemaTypes = z.infer<typeof BoardFormSchema>;

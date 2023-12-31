import { Barangay } from "@prisma/client";
import { z } from "zod";

export type TBarangay = z.infer<typeof BarangaySchema>;
export type TBarangayGetQuery = z.infer<typeof BarangayGetQuerySchema>;
export type TCreateBarangay = z.infer<typeof CreateBarangaySchema>;
export type TUpdateBarangay = z.infer<typeof UpdateBarangaySchema>;

export const BarangaySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Barangay>;

export const BarangayGetQuerySchema = z.object({
  name: z.string().optional(),
});

export const CreateBarangaySchema = BarangaySchema.pick({
  name: true,
}).extend({
  name: z.string().min(3).max(255),
});

export const UpdateBarangaySchema = BarangaySchema.pick({
  name: true,
}).extend({
  name: z.string().min(3).max(255),
});

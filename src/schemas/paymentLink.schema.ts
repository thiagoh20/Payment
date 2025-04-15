import { z } from "zod";

export const paymentLinkSchema = z
  .object({
    amount: z.number().positive(),
    descripcion: z.string(),
    services: z.array(z.number()).default([1, 2]),
    currency: z.string(),
    id_form: z.number(),
    fecha_vencimiento: z.string(),
    status: z.boolean(),
    additionaldata: z
      .object({
        reference: z.string().optional(),
      })
      .passthrough()
      .default({}),
  })
  .passthrough();

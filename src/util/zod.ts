import { z } from "zod";

// Custom Zod object that applies .strict() by default
export const strictZ = {
  object: <T extends z.ZodRawShape>(shape: T) => z.object(shape).strict(),
};

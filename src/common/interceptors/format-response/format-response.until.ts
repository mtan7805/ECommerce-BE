import z from 'zod';
import { FormatResponseSchema } from '../../utils/api-util/dto/api-util.dto';

export const withRespone = <T extends z.ZodTypeAny>(schema: T) => {
  FormatResponseSchema.extend({
    data: schema,
  });
};

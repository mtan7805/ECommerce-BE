import { createZodDto } from 'nestjs-zod';
import { VendorUncheckedCreateInputSchema } from 'src/generated/zod';

class CreateVendorDto extends createZodDto(VendorUncheckedCreateInputSchema) {}

export { CreateVendorDto };

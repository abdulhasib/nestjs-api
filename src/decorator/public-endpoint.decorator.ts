// public-endpoint.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PublicEndpoint = () => SetMetadata('isPublic', true);

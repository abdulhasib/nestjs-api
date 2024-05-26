// /module/customer/name/dto/update-name.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstname?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastname?: string;
}

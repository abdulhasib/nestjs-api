import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly address1?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly postalcode?: string;
}
